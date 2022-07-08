import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";
import { Meeting } from "@prisma/client";
import { customAlphabet } from "nanoid";

export type CreateMeetingArgs = {
  location: string;
  scheduledFor: Date;
  agenda?: string;
  clubId: string;
};

export type CreateMeetingPayload = Awaited<ReturnType<typeof createMeeting>>;

export const createMeeting = async (
  _parent: any,
  { clubId, ...data }: CreateMeetingArgs,
  { prisma, auth }: Context
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      roles: {
        where: {
          clubId: clubId,
        },
        select: {
          permissions: {
            select: {
              canManageMeetings: true,
            },
          },
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User was not found", "RESOURCE_NOT_FOUND", {
      userId: auth.id,
    });

  if (!user.roles.some((role) => role.permissions.canManageMeetings))
    throw new ApolloError(
      "You do not have permission to manage meetings",
      "UNAUTHORIZED_ACTION"
    );

  const generateMeetingCode = async (): Promise<string> => {
    const gen = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
    const code = gen();
    const user = await prisma.meeting.findUnique({
      where: { code: code },
    });
    if (user) return generateMeetingCode();
    return code;
  };

  const meeting = await prisma.meeting.create({
    data: {
      code: await generateMeetingCode(),
      ...data,
      club: {
        connect: {
          id: clubId,
        },
      },
    },
  });

  return meeting;
};

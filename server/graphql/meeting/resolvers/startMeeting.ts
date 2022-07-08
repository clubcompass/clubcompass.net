import { Context } from "@apollo/client";
import { ApolloError } from "apollo-server-micro";
import { Meeting } from "@prisma/client";

export type StartMeetingArgs = {
  meetingId: Meeting["id"];
};

export type StartMeetingPayload = Awaited<ReturnType<typeof startMeeting>>;

export const startMeeting = async (
  _parent: any,
  { meetingId }: StartMeetingArgs,
  { prisma, auth }: Context
) => {
  const meeting = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
    select: {
      clubId: true,
    },
  });

  if (!meeting)
    throw new ApolloError("Meeting was not found", "RESOURCE_NOT_FOUND", {
      meetingId: meetingId,
    });

  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      roles: {
        where: {
          clubId: meeting.clubId,
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
      "UNAUTHORIZED_ACTION",
      { userId: auth.id }
    );

  const startedMeeting = await prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      startedAt: new Date(),
      status: "OPEN",
    },
  });

  return startedMeeting;
};

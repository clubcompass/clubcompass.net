import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";
import { Meeting } from "@prisma/client";

export type ScheduleMeetingArgs = {
  meetingId: Meeting["id"];
};

export type ScheduleMeetingPayload = Awaited<
  ReturnType<typeof scheduleMeeting>
>;

export const scheduleMeeting = async (
  _parent: any,
  { meetingId }: ScheduleMeetingArgs,
  { prisma, auth }: Context
) => {
  const meeting = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
    select: {
      status: true,
      clubId: true,
    },
  });

  if (!meeting)
    throw (
      (new ApolloError("Meeting was not found", "RESOURCE_NOT_FOUND"),
      { meetingId: meetingId })
    );

  if (meeting.status !== "DRAFT")
    throw new ApolloError("Meeting already published", "CONSTRAINT_FAILED", {
      status: meeting.status,
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
      "UNAUTHORIZED_ACTION"
    );

  const scheduledMeeting = await prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      status: "SCHEDULED",
    },
  });

  return scheduledMeeting;
};

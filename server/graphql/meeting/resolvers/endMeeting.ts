import { Context } from "@apollo/client";
import { ApolloError } from "apollo-server-micro";
import { Meeting } from "@prisma/client";

export type EndMeetingArgs = {
  meetingId: Meeting["id"];
};

export type EndMeetingPayload = Awaited<ReturnType<typeof endMeeting>>;

export const endMeeting = async (
  _parent: any,
  { meetingId }: EndMeetingArgs,
  { prisma, auth }: Context
) => {
  const meeting = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
    select: {
      status: true,
      clubId: true,
      startTime: true,
    },
  });

  if (!meeting)
    throw new ApolloError("Meeting was not found", "RESOURCE_NOT_FOUND", {
      meetingId: meetingId,
    });

  if (meeting.status !== "OPEN")
    throw new ApolloError("Meeting is not open", "UNAUTHORIZED_ACTION", {
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
      "UNAUTHORIZED_ACTION",
      { userId: auth.id }
    );

  const duration = new Date().getTime() - meeting.startTime;

  const endedMeeting = await prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      endedAt: new Date(),
      status: "CLOSED",
      duration: duration,
    },
  });

  return endedMeeting;
};

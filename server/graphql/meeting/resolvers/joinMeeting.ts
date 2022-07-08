import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";
import { Meeting } from "@prisma/client";

export type JoinMeetingArgs = {
  code: Meeting["code"];
};

export type JoinMeetingPayload = Awaited<ReturnType<typeof joinMeeting>>;

export const joinMeeting = async (
  _parent: any,
  { code }: JoinMeetingArgs,
  { prisma, auth }: Context
) => {
  const meeting = await prisma.meeting.findUnique({
    where: {
      code: code,
    },
    select: {
      status: true,
      clubId: true,
    },
  });

  if (!meeting)
    throw new ApolloError("Meeting was not found", "RESOURCE_NOT_FOUND", {
      meetingCode: code,
    });

  if (meeting.status !== "OPEN")
    throw new ApolloError(
      `Meeting status is ${meeting.status}`,
      "UNAUTHORIZED_ACTION",
      {
        status: meeting.status,
      }
    );

  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      clubs: {
        where: {
          id: meeting.clubId,
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User was not found", "RESOURCE_NOT_FOUND", {
      userId: auth.id,
    });

  if (user.clubs.length === 0)
    throw new ApolloError(
      "Not member of corresponding club",
      "UNAUTHORIZED_ACTION",
      { userId: auth.id }
    );

  const joinedMeeting = await prisma.meeting.update({
    where: {
      code: code,
    },
    data: {
      attendees: {
        connect: {
          id: auth.id,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return joinedMeeting;
};

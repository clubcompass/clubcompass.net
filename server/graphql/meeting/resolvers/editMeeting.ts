import { Context } from "../../ctx";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { Meeting } from "@prisma/client";
import { validate } from "../../../utils/validation";
import { editMeetingSchema } from "../../../utils/validation/schemas/meeting/editMeetingSchema";

type EditMeetingData = {
  location?: Meeting["location"];
  agenda?: Meeting["agenda"];
  minutes?: Meeting["minutes"];
};

export type EditMeetingArgs = {
  meetingId: Meeting["id"];
  data: EditMeetingData;
};

export type EditMeetingPayload = Awaited<ReturnType<typeof editMeeting>>;

export const editMeeting = async (
  _parent: any,
  { meetingId, data }: EditMeetingArgs,
  { prisma, auth }: Context
) => {
  const { valid, errors } = await validate({
    schema: editMeetingSchema as any,
    data: data,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const meeting = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
    select: {
      club: {
        select: {
          roles: {
            select: {
              permissions: {
                select: {
                  canManageMeetings: true,
                },
              },
              users: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!meeting)
    throw new ApolloError("Meeting not found", "RESOURCE_NOT_FOUND", {
      id: meetingId,
    });

  if (
    !meeting.club.roles.some(
      (role) =>
        role.permissions.canManageMeetings === true &&
        role.users.some((user) => user.id === auth.id)
    )
  )
    throw new ApolloError(
      "You do not have permission to edit this meeting",
      "UNAUTHORIZED_ACTION"
    );

  const updatedMeeting = await prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      ...data,
    },
    select: {
      id: true,
    },
  });

  return updatedMeeting;
};

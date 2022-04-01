import type { Club } from "@prisma/client";
import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

// only president of club and user in club can complete this action

export type LeaveClubArgs = {
  clubId: Club["id"];
};

export type LeaveClubPayload = Awaited<ReturnType<typeof leaveClub>>;

export const leaveClub = async (
  _parent: any,
  { clubId }: LeaveClubArgs,
  { prisma, auth: student }: Context
): Promise<typeof user> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      availability: true,
      members: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!club) throw new ApolloError("Club not found", "RESOURCE_NOT_FOUND");

  const memberIds = club.members.map((member) => member.id);
  if (!memberIds.includes(student.id)) {
    throw new ApolloError(
      "You are not a member of this club",
      "UNAUTHORIZED_ACCESS"
    );
  }

  const roles = await prisma.user
    .findUnique({
      where: {
        id: student.id,
      },
    })
    .roles();

  const newRoles = roles
    .filter((role) => role.clubId !== clubId)
    .map((role) => ({
      id: role.id,
    }));

  const user = await prisma.user.update({
    where: {
      id: student.id,
    },
    data: {
      clubs: {
        disconnect: {
          id: clubId,
        },
      },
      roles: {
        set: [],
        connect: newRoles,
      },
      canEdit: {
        disconnect: {
          id: clubId,
        },
      },
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      clubs: {
        where: {
          id: clubId,
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return user;
};

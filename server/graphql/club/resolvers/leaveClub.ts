import type { Club } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type LeaveClubArgs = {
  clubId: Club["id"];
};

export type LeaveClubPayload = Awaited<ReturnType<typeof leaveClub>>;

export const leaveClub = async (
  _parent: any,
  { clubId }: LeaveClubArgs,
  { prisma, auth }: Context
): Promise<typeof user> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data");

  const roles = await prisma.user
    .findUnique({
      where: {
        id: token.id,
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
      id: token.id,
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

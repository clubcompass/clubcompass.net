import { Context } from "../../ctx";
import { Club, InviteStatus } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type SendClubForApprovalArgs = {
  clubId: Club["id"];
};

export type SendClubForApprovalPayload = Awaited<
  ReturnType<typeof sendClubForApproval>
>;

export const sendClubForApproval = async (
  _parent: any,
  { clubId }: SendClubForApprovalArgs,
  { prisma }: Context
): Promise<typeof updatedClub> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      teacher: {
        select: {
          id: true,
        },
      },
      members: {
        select: {
          roles: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  let requiredRoles = {
    "vice president": 0,
    secretary: 0,
    treasurer: 0,
  };

  club.members.forEach((member) => {
    if (member.roles.length === 0) return;
    member.roles.forEach((role) => {
      if (role.name in requiredRoles) {
        requiredRoles[role.name]++;
      }
    });
  });

  Object.keys(requiredRoles).forEach((role) => {
    if (requiredRoles[role] === 0) {
      throw new ApolloError(`Missing user with role ${role}`, "MISSING_ROLE");
    }
  });

  if (!club.teacher) {
    throw new ApolloError("Club has no teacher", "NO_TEACHER");
  }

  const updatedClub = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      status: "REVIEW",
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });

  return updatedClub;
};

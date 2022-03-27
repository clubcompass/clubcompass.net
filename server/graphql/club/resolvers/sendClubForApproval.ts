import { Context } from "../../ctx";
import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { validate } from "../../../utils/validation";
import { sendClubForApprovalSchema } from "../../../utils/validation/schemas/club";

export type SendClubForApprovalArgs = {
  clubId: Club["id"];
};

export type SendClubForApprovalPayload = Awaited<
  ReturnType<typeof sendClubForApproval>
>;

export const sendClubForApproval = async (
  _parent: any,
  { clubId }: SendClubForApprovalArgs,
  { prisma, auth: president }: Context
): Promise<typeof updatedClub> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      email: true,
      meetingDate: true,
      location: true,
      availability: true,
      tags: true,
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
      roles: {
        where: {
          name: {
            equals: "president",
          },
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!club) throw new ApolloError("Club not found", "RESOURCE_NOT_FOUND");

  const { valid, errors } = await validate({
    schema: sendClubForApprovalSchema,
    data: club,
  });

  if (!valid)
    throw new ApolloError(
      "Your club is missing some required fields",
      "MISSING_REQUIRED",
      { errors }
    );

  let ids = club.roles[0].users.map((user) => user.id);
  if (!ids.includes(president.id)) {
    throw new ApolloError(
      "You are not the president of this club",
      "UNAUTHORIZED"
    );
  }

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

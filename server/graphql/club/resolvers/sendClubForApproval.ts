import { Context } from "../../ctx";
import { Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { validate } from "../../../utils/validation";
import { sendClubForApprovalSchema } from "../../../utils/validation/schemas/club";
import { roles } from "lib/db";

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
      status: true,
      email: true,
      meetingDate: true,
      location: true,
      availability: true,
      tags: true,
      roles: {
        select: {
          name: true,
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

  if (club.status !== "DRAFT")
    throw new ApolloError("Club status is not draft", "CONSTRAINT_FAILED");

  console.log(club.roles);

  club.roles.map((role) => console.log(role));

  if (
    !club.roles
      .find((role) => role.name === "President")
      .users.find((user) => user.id === president.id)
  )
    throw new ApolloError(
      "You are not a president of this club",
      "UNAUTHORIZED_ACTION"
    );

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

  club.roles.map((role) => {
    if (role.users.length === 0)
      throw new ApolloError(
        `You must assign a member to the ${role.name} role`,
        "CONSTRAINT_FAILED",
        { roleName: role.name }
      );
  });

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

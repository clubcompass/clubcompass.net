import { Club, Tag } from "@prisma/client";
import { Context } from "../../ctx";
import { validate } from "../../../utils/validation";
import { editClubSchema } from "../../../utils/validation/schemas/club";
import { ApolloError, UserInputError } from "apollo-server-micro";
import { permissions } from "server/utils/auth/permissions";

type EditClubData = {
  name?: Club["name"];
  description?: Club["description"];
  email?: Club["email"];
  meetingDate?: Club["meetingDate"];
  location?: Club["location"];
  availability?: Club["availability"];
  tags?: Tag[];
};
export interface EditClubArgs {
  clubId: Club["id"];
  data: EditClubData;
}

export type EditClubPayload = Awaited<ReturnType<typeof editClub>>;

export const editClub = async (
  _parent: any,
  { clubId, data }: EditClubArgs,
  { prisma, auth: member }: Context
) => {
  const clubData = {
    ...data,
    ...(data.tags && {
      tags: { set: [], connect: data.tags.map((tag) => ({ id: tag.id })) },
    }),
  };

  const { valid, errors } = await validate({
    schema: editClubSchema as any,
    data: clubData,
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      roles: {
        select: {
          permissions: {
            select: {
              canManageClubPage: true,
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
  });

  if (!club)
    throw new ApolloError("Club not found", "RESOURCE_NOT_FOUND", {
      id: clubId,
    });

  if (
    !club.roles.some(
      (role) =>
        role.permissions.canManageClubPage === true &&
        role.users.some((user) => user.id === member.id)
    )
  )
    throw new ApolloError(
      "You are not authorized to edit this club's page",
      "UNAUTHORIZED_ACCESS",
      { id: clubId }
    );

  return prisma.club.update({
    where: { id: clubId },
    data: {
      ...clubData,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      email: true,
      meetingDate: true,
      location: true,
      availability: true,
      tags: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
      status: true,
      approval: true,
    },
  });
};

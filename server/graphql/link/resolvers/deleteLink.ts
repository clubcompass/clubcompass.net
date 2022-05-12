import { Context } from "../../ctx";
import { Club, Link } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type DeleteLinkData = {
  linkId: Link["id"];
};

export interface DeleteLinkArgs {
  clubId: Club["id"];
  data: DeleteLinkData;
}

export type DeleteLinkPayload = Awaited<ReturnType<typeof deleteLink>>;

export const deleteLink = async (
  _parent: any,
  { clubId, data }: DeleteLinkArgs,
  { auth: member, prisma }: Context
): Promise<typeof response> => {
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
      links: {
        where: {
          id: data.linkId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!club) {
    throw new ApolloError("Club was not found", "RESOURCE_NOT_FOUND", {
      clubId,
    });
  }

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

  if (!club?.links)
    throw new ApolloError("Link was not found", "RESOURCE_NOT_FOUND", {
      id: data.linkId,
    });

  const response = await prisma.link.delete({
    where: {
      id: data.linkId,
    },
    select: {
      id: true,
    },
  });

  return response;
};

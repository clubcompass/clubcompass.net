import { Context } from "../../ctx";
import { Club, Link } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type EditClubData = {
  name: Link["name"];
  link: Link["link"];
  type: Link["type"];
};

export type AddLinkArgs = {
  clubId: Club["id"];
  data: EditClubData;
};

export type AddLinkPayload = Awaited<ReturnType<typeof addLink>>;

export const addLink = async (
  _parent: any,
  { clubId, data }: AddLinkArgs,
  { auth: president, prisma }: Context
): Promise<typeof response> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      roles: {
        where: {
          name: "president",
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

  if (!club)
    throw new ApolloError("Club was not found", "RESOURCE_NOT_FOUND", {
      clubId,
    });

  if (
    !club.roles.some((role) =>
      role.users.some((user) => user.id === president.id)
    )
  )
    throw new ApolloError(
      "You are not authorized to edit this club",
      "UNAUTHORIZED_ACCESS",
      { id: clubId }
    );

  const response = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      links: {
        create: {
          name: data.name,
          link: data.link,
          type: data.type,
        },
      },
    },
    select: {
      id: true,
      links: {
        select: {
          id: true,
          name: true,
          link: true,
          type: true,
        },
      },
    },
  });

  return response;
};

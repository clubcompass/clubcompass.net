import { Context } from "../../ctx";
import { Role } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type GetUserClubsArgs = {};

export type GetUserClubsPayload = Awaited<ReturnType<typeof getUserClubs>>;

export const getUserClubs = async (
  _parent: any,
  _args: GetUserClubsArgs,
  { prisma, auth }: Context
): Promise<typeof clubs> => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      clubs: {
        select: {
          id: true,
          slug: true,
          name: true,
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
          status: true,
          location: true,
          meetingDate: true,
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
      id: auth.id,
    });

  user.clubs.map((club) => {
    const roles = club.roles.filter((role) => {
      if (role.users.some((user) => user.id === auth.id)) return role;
    });
    club.roles = roles;
  });

  user.clubs = user.clubs.filter((club) => {
    if (club.roles.some((role) => role.name !== "president")) return club;
  });

  const clubs = user.clubs;

  return clubs;
};

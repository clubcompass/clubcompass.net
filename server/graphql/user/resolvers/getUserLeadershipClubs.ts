import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type GetUserLeadershipClubsArgs = {};

export type GetUserLeadershipClubsPayload = Awaited<
  ReturnType<typeof getUserLeadershipClubs>
>;

export const getUserLeadershipClubs = async (
  _parent: any,
  _args: GetUserLeadershipClubsArgs,
  { prisma, auth: token }: Context
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
        },
      },
      canEdit: {
        select: {
          id: true,
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

  const presidentOf = user.clubs.filter((club) => {
    if (club.roles.some((role) => role.name === "president")) return club;
  });

  const editorOf = user.clubs.filter((club) => {
    if (user.canEdit.some((canEdit) => canEdit.id === club.id)) return club;
  });

  const rest = user.clubs.filter((club) => {
    if (
      !(
        club.roles.some((role) => role.name === "president") ||
        user.canEdit.some((canEdit) => canEdit.id === club.id)
      )
    )
      return club;
  });

  const clubs = [...presidentOf, ...editorOf, ...rest];

  return clubs;
};

import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "./../../../utils/auth";

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
      id: token.id,
      // id: "cl0yydiss0048c7xmcrvj2x92",
    },
    include: {
      clubs: {
        where: {
          approval: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
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
          roles: {
            where: {
              users: {
                every: {
                  id: {
                    equals: token.id,
                    // equals: "cl0yydiss0048c7xmcrvj2x92",
                  },
                },
              },
            },
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
      canEdit: {
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
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
        },
      },
    },
  });

  const isPresidentOf = user.clubs.filter((club) =>
    club.roles.every((role) => role.name === "president")
  );

  const hasLeadershipIn = user.clubs.filter((club) =>
    club.roles.every(
      (role) => role.type === "LEADER" && !isPresidentOf.includes(club)
    )
  );

  const hasEditorIn = user.canEdit;

  // .clubs({ include: { roles: true, editors: true } });

  // const isPresidentOf = userClubs.filter((club) =>
  //   club.roles.some((role) => role.name === "president")
  // );
  // const hasLeadershipIn = userClubs.filter((club) =>
  //   club.roles.some((role) => role.type === "LEADERSHIP")
  // );

  // find roles where type is leadership but not president
  // const hasLeadershipIn = userClubs.filter((club) =>
  //   club.roles.some(
  //     (role) => role.type === "LEADER" && !isPresidentOf.includes(club)
  //   )
  // );
  // const hasEditorIn = userClubs.filter((club) =>
  //   club.roles.some((role) => role.name === "editor")
  // );

  const clubs = {
    isPresidentOf,
    hasLeadershipIn,
    hasEditorIn,
  };

  return clubs;
};

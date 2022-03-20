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
  { prisma, auth }: Context
): Promise<typeof clubs> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data");

  const userClubs = await prisma.user
    .findUnique({
      where: {
        id: token.id,
      },
    })
    .clubs({
      include: {
        roles: true,
        editors: true,
        tags: true,
        _count: { select: { members: true } },
      },
    });

  const isPresidentOf = userClubs.filter((club) =>
    club.roles.some((role) => role.name === "president")
  );
  // const hasLeadershipIn = userClubs.filter((club) =>
  //   club.roles.some((role) => role.type === "LEADERSHIP")
  // );

  // find roles where type is leadership but not president
  const hasLeadershipIn = userClubs.filter((club) =>
    club.roles.some(
      (role) => role.type === "LEADER" && !isPresidentOf.includes(club)
    )
  );
  const hasEditorIn = userClubs.filter((club) =>
    club.roles.some((role) => role.name === "editor")
  );

  const clubs = {
    isPresidentOf,
    hasLeadershipIn,
    hasEditorIn,
  };

  return clubs;
};

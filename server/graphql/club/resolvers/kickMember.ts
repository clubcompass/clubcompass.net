import { Club, User } from "@prisma/client";
import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

export type KickMemberArgs = {
  clubId: Club["id"];
  userId: User["id"];
};

export type KickMemberPayload = Awaited<ReturnType<typeof kickMember>>;

export const kickMember = async (
  _parent: any,
  { clubId, userId }: KickMemberArgs,
  { prisma, auth: user }: Context
) => {
  const leader = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      roles: {
        where: {
          clubId: clubId,
        },
        select: {
          rank: true,
          permissions: {
            select: {
              canManageClubPage: true,
              canManageInvites: true,
              canManageMembers: true,
            },
          },
        },
      },
    },
  });

  if (!leader.roles.find((role) => role.permissions.canManageMembers === true))
    throw new ApolloError(
      "Cannot kick members from club",
      "UNAUTHORIZED_ACCESS",
      { userId: userId, clubId: clubId, memberId: user.id }
    );

  const member = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      clubs: {
        where: {
          id: clubId,
        },
      },
      roles: {
        where: {
          clubId: clubId,
        },
        select: {
          name: true,
          rank: true,
          type: true,
          permanent: true,
          users: {
            select: {
              id: true,
            },
          },
          permissions: {
            select: {
              canManageClubPage: true,
              canManageInvites: true,
              canManageMembers: true,
            },
          },
        },
      },
    },
  });

  if (!member)
    throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
      id: userId,
    });

  if (member.clubs.length === 0)
    throw new ApolloError(
      "User is not a member of this club",
      "UNAUTHORIZED_ACTION",
      { userId: userId, clubId: clubId }
    );

  if (member.roles.length === 0) {
    const roles = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .roles();

    const clubRoles = roles.filter((role) => {
      if (role.clubId === clubId) {
        return role;
      }
    });

    clubRoles.map((role) => {
      if (role.name === "president") {
        throw new ApolloError(
          "You are the president of this club, you cannot leave it",
          "UNAUTHORIZED_ACCESS"
        );
      }
    });

    const newRoles = roles
      .filter((role) => role.clubId !== clubId)
      .map((role) => ({
        id: role.id,
      }));

    const kickedMember = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        clubs: {
          disconnect: {
            id: clubId,
          },
        },
        roles: {
          set: [],
          connect: newRoles,
        },
      },
      select: {
        id: true,
      },
    });

    return kickedMember;
  }

  const highestLeaderRank = Math.max(...leader.roles.map((role) => role.rank));
  const highestMemberRank = Math.max(...member.roles.map((role) => role.rank));

  if (highestLeaderRank < highestMemberRank)
    throw new ApolloError(
      "Cannot kick member with higher rank",
      "UNAUTHORIZED_ACCESS",
      { userId: userId, clubId: clubId, memberId: user.id }
    );

  if (highestLeaderRank === highestMemberRank)
    throw new ApolloError(
      "Cannot kick member with equal rank",
      "UNAUTHORIZED_ACCESS",
      { userId: userId, clubId: clubId, memberId: user.id }
    );

  member.roles.map((role) => {
    if (
      role.type === "LEADER" &&
      role.permanent === true &&
      role.users.length === 1
    )
      throw new ApolloError(
        `Kicking member of role ${role.name} will result in zero members in the required role. Assign another member to the role before kicking this member`,
        "UNAUTHORIZED_ACCESS",
        { userId: userId, clubId: clubId, memberId: user.id }
      );
  });

  //optimize this by removing unnecessary prisma call below, do this later

  const roles = await prisma.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .roles();

  const clubRoles = roles.filter((role) => {
    if (role.clubId === clubId) {
      return role;
    }
  });

  clubRoles.map((role) => {
    if (role.name === "president") {
      throw new ApolloError(
        "You are the president of this club, you cannot leave it",
        "UNAUTHORIZED_ACCESS"
      );
    }
  });

  const newRoles = roles
    .filter((role) => role.clubId !== clubId)
    .map((role) => ({
      id: role.id,
    }));

  const kickedMember = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      clubs: {
        disconnect: {
          id: clubId,
        },
      },
      roles: {
        set: [],
        connect: newRoles,
      },
    },
    select: {
      id: true,
    },
  });

  return kickedMember;
};

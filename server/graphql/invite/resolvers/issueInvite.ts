import { Club, User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

type RoleInput = {
  id: string;
};

export type IssueInviteArgs = {
  clubId: Club["id"];
  recipientCCID: User["ccid"];
  inviteRoles: RoleInput[];
};

export type IssueInvitePayload = Awaited<ReturnType<typeof issueInvite>>;

export const issueInvite = async (
  _parent: any,
  { clubId, recipientCCID, inviteRoles }: IssueInviteArgs,
  { prisma, auth }: Context
): Promise<typeof invite> => {
  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      members: {
        where: {
          ccid: recipientCCID,
        },
        select: {
          id: true,
        },
      },
      roles: {
        select: {
          permissions: {
            select: {
              canManageInvites: true,
            },
          },
          users: {
            select: {
              ccid: true,
            },
          },
        },
      },
    },
  });

  const issuer = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      roles: {
        where: {
          clubId: clubId,
        },
        select: {
          rank: true,
        },
      },
    },
  });

  const roles = await prisma.role.findMany({
    where: {
      AND: inviteRoles,
    },
    select: {
      rank: true,
      type: true,
    },
  });

  const highestIssuerRank = Math.max(...issuer.roles.map((role) => role.rank));

  const highestRolesRank = Math.max(...roles.map((role) => role.rank));

  if (highestIssuerRank <= highestRolesRank)
    throw new ApolloError(
      "Cannot issue invites to other leadership positions",
      "UNAHORIZED_ACCESS",
      { inviteRoles: inviteRoles }
    );

  if (!club)
    throw new ApolloError("Club was not found", "RESOURCE_NOT_FOUND", {
      clubId,
    });

  if (recipientCCID === auth.ccid) {
    throw new ApolloError(
      "Cannot invite yourself to a club that you own",
      "UNAUTHORIZED_ACTION",
      { recipientCCID }
    );
  }

  if (
    !club.roles.some(
      (role) =>
        role.permissions.canManageInvites === true &&
        role.users.some((user) => user.ccid === recipientCCID)
    )
  )
    throw new ApolloError(
      "You are not authorized to edit this club's page",
      "UNAUTHORIZED_ACCESS",
      { id: clubId }
    );

  if (club.members.length !== 0) {
    throw new ApolloError(
      "Requested user to invite is already a member in this club",
      "UNAUTHORIZED_ACTION",
      {
        recipientCCID,
      }
    );
  }

  const userInvite = await prisma.invite.findFirst({
    where: {
      clubId: clubId,
      status: "PENDING",
      user: {
        ccid: recipientCCID,
      },
    },
  });

  if (userInvite) {
    throw new ApolloError(
      "Requested user to invite already has a pending invitation associated with your club",
      "UNAUTHORIZED_ACTION"
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      ccid: recipientCCID,
    },
  });

  if (!user)
    throw new ApolloError("User was not found", "RESOURCE_NOT_FOUND", {
      recipientCCID,
    });

  if (user.active === false)
    throw new ApolloError("User is not approved", "UNAUTHORIZED_ACTION", {
      recipientCCID,
    });

  if (user.type === "TEACHER") {
    if (!roles.some((role) => role.type === "ADVISOR"))
      throw new ApolloError(
        "Requested user to invite is a teacher, but the role is not an advisor",
        "UNAUTHORIZED_ACTION"
      );

    if (highestIssuerRank !== 2)
      throw new ApolloError(
        "Need to be club president to invite an advisor",
        "UNAUTHORIZED_ACTION",
        { highestIssuerRank: highestIssuerRank }
      );

    const invite = await prisma.invite.create({
      data: {
        type: "INCOMING",
        club: {
          connect: {
            id: clubId,
          },
        },
        user: {
          connect: {
            ccid: recipientCCID,
          },
        },
        roles: {
          connect: inviteRoles,
        },
        status: "PENDING",
      },
      select: {
        id: true,
      },
    });

    return invite;
  }

  if (user.type !== "STUDENT")
    throw new ApolloError("User is not a student", "UNAUTHORIZED_ACTION", {
      recipientCCID,
    });

  const invite = await prisma.invite.create({
    data: {
      type: "INCOMING",
      club: {
        connect: {
          id: clubId,
        },
      },
      user: {
        connect: {
          ccid: recipientCCID,
        },
      },
      roles: {
        connect: inviteRoles,
      },
      status: "PENDING",
    },
    select: {
      id: true,
    },
  });

  return invite;
};

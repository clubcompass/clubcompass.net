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
        where: {
          name: {
            equals: "president",
          },
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

  if (recipientCCID === auth.ccid) {
    throw new ApolloError(
      "Cannot invite yourself to a club that you own",
      "UNAUTHORIZED_ACTION",
      { recipientCCID }
    );
  }

  let ids = club.roles[0].users.map((user) => user.id);
  if (!ids.includes(auth.id)) {
    throw new ApolloError(
      "You are not authorized to issue an invite to this club",
      "UNAUTHORIZED_ACTION",
      { id: auth.id }
    );
  }

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

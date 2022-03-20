import { Club, User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

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
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new ApolloError("No token data");

  // to issue invite you must be the president of the club, and the recipient must not be a member of the club or have an invite from the club
  const { roles, members } = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
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

  if (!roles) {
    throw new ApolloError(
      `Club with id ${clubId} does not exist`,
      "CLUB_NOT_FOUND"
    );
  }

  if (roles[0].users[0].id !== token.id) {
    // president id (what the fuck bro)
    throw new ApolloError(
      `User with id ${token.id} is not a president of club with id ${clubId}`,
      "NOT_PRESIDENT"
    );
  } // check for editor too

  if (members.length !== 0) {
    throw new ApolloError(
      `User with id ${recipientCCID} is already a member of club with id ${clubId}`,
      "ALREADY_MEMBER"
    );
  }

  // check if user is already invited from this club
  const userInvite = await prisma.invite.findFirst({
    where: {
      clubId: clubId,
      user: {
        ccid: recipientCCID,
      },
    },
  }); // check for just pending? currently throws for all statuses

  if (userInvite) {
    throw new ApolloError(
      `User with id ${recipientCCID} is already invited to club with id ${clubId}`,
      "ALREADY_INVITED"
    );
  } // no dupe invites

  const invite = await prisma.invite.create({
    data: {
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
    include: {
      club: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          ccid: true,
          firstname: true,
          lastname: true,
        },
      },
      roles: true,
    },
  });

  console.log(invite);

  return invite;
};

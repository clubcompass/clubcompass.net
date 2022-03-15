import { Invite, Club } from "@prisma/client";
import { ApolloError, AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "./../../../utils/auth";

export type DeclineInviteArgs = {
  inviteId: Invite["id"];
  clubId: Club["id"];
};

export type DeclineInvitePayload = Awaited<ReturnType<typeof declineInvite>>;

export const declineInvite = async (
  _parent: any,
  { inviteId }: DeclineInviteArgs,
  { prisma, auth }: Context
): Promise<typeof updatedUser> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data");

  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
  });

  if (invite.userId !== token.id) {
    throw new ApolloError(
      `User Ids do not match (invite: ${invite.userId} !== user: ${token.id})`,
      "USER_ID_MISMATCH"
    ); // I don't think this should be a bad user input error
  }

  if (invite.status !== "PENDING")
    throw new ApolloError(
      "Cannot decline invite that doesn't have a pending status.",
      "INVALID_INVITE_DECLINE_STATUS",
      { ...invite }
    );

  const updatedUser = await prisma.user.update({
    where: {
      id: token.id,
    },
    data: {
      invites: {
        update: {
          where: {
            id: inviteId,
          },
          data: {
            status: "DECLINED",
          },
        },
      },
    },
    include: {
      invites: true,
    },
  });

  return updatedUser;
};

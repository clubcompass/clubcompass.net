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
  { prisma, auth: token }: Context
): Promise<typeof updatedUser> => {
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    include: {
      roles: true,
    },
  });

  if (!invite)
    throw new ApolloError("Invite was not found", "RESOURCE_NOT_FOUND", {
      inviteId,
    });

  if (invite.userId !== token.id) {
    throw new ApolloError(
      "You are trying to decline an invite that is not intended for you",
      "UNAUTHORIZED_ACTION",
      { userId: invite.userId, tokenId: token.id }
    );
  }

  if (invite.status !== "PENDING")
    throw new ApolloError(
      "Cannot decline invite that doesn't have a pending status",
      "UNAUTHORIZED_ACTION",
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

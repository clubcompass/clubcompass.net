import { Invite, Club } from "@prisma/client";
import { ApolloError, AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type AcceptInviteArgs = {
  inviteId: Invite["id"];
  clubId: Club["id"];
};

export type AcceptInvitePayload = Awaited<ReturnType<typeof acceptInvite>>;

export const acceptInvite = async (
  _parent: any,
  { inviteId, clubId }: AcceptInviteArgs,
  { prisma, auth }: Context
): Promise<typeof acceptedInvite> => {
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
      "Cannot accept invite that doesn't have a pending status",
      "INVALID_INVITE_ACCEPT_STATUS",
      { ...invite }
    );

  const acceptedInvite = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      invites: {
        update: {
          where: {
            id: inviteId,
          },
          data: {
            status: "ACCEPTED",
          },
        },
      },
      members: {
        connect: {
          id: token.id,
        },
      },
    },
    include: {
      members: {
        where: {
          id: token.id,
        },
      },
    },
  });
  return acceptedInvite;
};

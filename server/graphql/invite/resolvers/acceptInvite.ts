import { Invite, Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type AcceptInviteArgs = {
  inviteId: Invite["id"];
  clubId: Club["id"];
};

export type AcceptInvitePayload = Awaited<ReturnType<typeof acceptInvite>>;

export const acceptInvite = async (
  _parent: any,
  { inviteId, clubId }: AcceptInviteArgs,
  { prisma, auth: token }: Context
): Promise<typeof response> => {
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    include: {
      roles: true,
      club: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!invite)
    throw new ApolloError("Invite was not found", "RESOURCE_NOT_FOUND", {
      inviteId,
    });

  if (invite.userId !== token.id) {
    throw new ApolloError(
      "You are trying to accept an invite that is not intended for you",
      "UNAUTHORIZED_ACTION",
      { userId: invite.userId, tokenId: token.id }
    );
  }

  if (invite.status !== "PENDING")
    throw new ApolloError(
      "Cannot accept invite that doesn't have a pending status",
      "UNAUTHORIZED_ACTION",
      { ...invite }
    );

  const user = await prisma.user.update({
    where: {
      id: invite.userId,
    },
    data: {
      roles: {
        connect: invite.roles.map((role) => ({ id: role.id })),
      },
      clubs: {
        connect: {
          id: clubId,
        },
      },
      invites: {
        update: {
          where: {
            id: invite.id,
          },
          data: {
            status: "ACCEPTED",
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  const response = {
    id: invite.id,
    clubName: invite.club.name,
  };

  return response;
};

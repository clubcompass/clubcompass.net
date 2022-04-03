import { Invite, Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type AcceptTeacherInviteArgs = {
  inviteId: Invite["id"];
  clubId: Club["id"];
};

export type AcceptTeacherInvitePayload = Awaited<
  ReturnType<typeof acceptTeacherInvite>
>;

export const acceptTeacherInvite = async (
  _parent: any,
  { inviteId, clubId }: AcceptTeacherInviteArgs,
  { prisma, auth: token }: Context
): Promise<typeof user> => {
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
      advisor: {
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

  return user;
};

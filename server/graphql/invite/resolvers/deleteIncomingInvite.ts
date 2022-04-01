import { Invite } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type DeleteIncomingInviteArgs = {
  inviteId: Invite["id"];
};

export type DeleteIncomingInvitePayload = Awaited<
  ReturnType<typeof deleteIncomingInvite>
>;

export const deleteIncomingInvite = async (
  _parent: any,
  { inviteId }: DeleteIncomingInviteArgs,
  { prisma, auth: user }: Context
): Promise<typeof deletedInvite> => {
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    select: {
      id: true,
      userId: true,
      type: true,
    },
  });

  console.log("userID", user.id);

  console.log("invite", invite);

  console.log(invite.userId);

  if (!invite)
    throw new ApolloError("Invite was not found", "RESOURCE_NOT_FOUND", {
      inviteId,
    });

  if (invite.type !== "INCOMING")
    throw new ApolloError(
      "You can only delete invites you have sent",
      "UNAUTHORIZED_ACTION"
    );

  if (invite.userId !== user.id)
    throw new ApolloError(
      "You are not the owner of this invite",
      "UNAUTHORIZED_ACTION"
    );

  const deletedInvite = await prisma.invite.delete({
    where: {
      id: inviteId,
    },
    select: {
      id: true,
    },
  });

  return deletedInvite;
};

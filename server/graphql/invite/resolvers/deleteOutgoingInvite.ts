import { Invite } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type DeleteOutgoingInviteArgs = {
  inviteId: Invite["id"];
};

export type DeleteOutgoingInvitePayload = Awaited<
  ReturnType<typeof deleteOutgoingInvite>
>;

export const deleteOutgoingInvite = async (
  _parent: any,
  { inviteId }: DeleteOutgoingInviteArgs,
  { prisma, auth: user }: Context
): Promise<typeof deletedInvite> => {
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    select: {
      id: true,
      type: true,
      club: {
        select: {
          id: true,
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
      },
    },
  });

  if (!invite)
    throw new ApolloError("Invite was not found", "RESOURCE_NOT_FOUND", {
      inviteId,
    });

  if (invite.type !== "OUTGOING")
    throw new ApolloError(
      "You can only delete invites you have sent",
      "UNAUTHORIZED_ACTION"
    );

  let ids = invite.club.roles[0].users.map((user) => user.id);
  if (!ids.includes(user.id)) {
    throw new ApolloError(
      "You are not authorized to delete an invite issued by the president of this club",
      "UNAUTHORIZED_ACTION",
      { id: user.id }
    );
  }

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

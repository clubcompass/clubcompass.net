import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type GetUserInvitesArgs = {};

export type GetUserInvitesPayload = Awaited<ReturnType<typeof getUserInvites>>;

export const getUserInvites = async (
  _parent: any,
  _args: GetUserInvitesArgs,
  { prisma, auth }: Context
): Promise<typeof invites> => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      invites: {
        select: {
          id: true,
          club: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              status: true,
            },
          },
          roles: {
            select: {
              name: true,
            },
          },
          type: true,
          status: true,
        },
      },
    },
  });

  // console.log(user);

  if (!user)
    throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
      id: auth.id,
    });

  let invites = {
    incoming: {
      pending: [],
      accepted: [],
      declined: [],
    },
    outgoing: {
      pending: [],
      accepted: [],
      declined: [],
    },
  };

  invites.incoming.pending = user.invites.filter((invite) => {
    if (invite.status === "PENDING" && invite.type === "INCOMING")
      return invite;
  });

  invites.incoming.accepted = user.invites.filter((invite) => {
    if (invite.status === "ACCEPTED" && invite.type === "INCOMING")
      return invite;
  });

  invites.incoming.declined = user.invites.filter((invite) => {
    if (invite.status === "DECLINED" && invite.type === "INCOMING")
      return invite;
  });

  invites.outgoing.pending = user.invites.filter((invite) => {
    if (invite.status === "PENDING" && invite.type === "OUTGOING")
      return invite;
  });

  invites.outgoing.accepted = user.invites.filter((invite) => {
    if (invite.status === "ACCEPTED" && invite.type === "OUTGOING")
      return invite;
  });

  invites.outgoing.declined = user.invites.filter((invite) => {
    if (invite.status === "DECLINED" && invite.type === "OUTGOING")
      return invite;
  });

  console.log("invites", invites);

  return invites;
};

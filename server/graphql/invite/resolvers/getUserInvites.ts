import { Invite } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "./../../../utils/auth";

export type GetUserInvitesArgs = {};

export type GetUserInvitesPayload = Awaited<ReturnType<typeof getUserInvites>>;

export const getUserInvites = async (
  _parent: any,
  _args: GetUserInvitesArgs,
  { prisma, auth: token }: Context
): Promise<typeof invites> => {
  const userInvites = await prisma.invite.findMany({
    where: {
      user: {
        id: token.id,
      },
    },
    include: {
      club: true,
    },
  });

  // userInvites has 3 possible statuses (pending, accepted, rejected), separate them into their own objects

  const pendingInvites = userInvites.filter(
    ({ status }: Invite) => status === "PENDING"
  );
  const acceptedInvites = userInvites.filter(
    ({ status }: Invite) => status === "ACCEPTED"
  );
  const declinedInvites = userInvites.filter(
    ({ status }: Invite) => status === "DECLINED"
  );

  const invites = {
    pendingInvites,
    acceptedInvites,
    declinedInvites,
  };

  return invites;
};

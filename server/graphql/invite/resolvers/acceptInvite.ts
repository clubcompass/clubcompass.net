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
): Promise<typeof user> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data");

  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
    include: {
      roles: true,
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
    include: {
      clubs: {
        where: {
          id: clubId,
        },
      },
      roles: {
        where: {
          clubId: clubId,
        },
      },
    },
  });

  return user;

  // const acceptedInvite = await prisma.club.update({
  //   where: {
  //     id: clubId,
  //   },
  //   data: {
  //     invites: {
  //       update: {
  //         where: {
  //           id: inviteId,
  //         },
  //         data: {
  //           status: "ACCEPTED",
  //         },
  //       },
  //     },
  //     members: {
  //       connect: {
  //         id: token.id,
  //       },
  //     },
  //   },
  //   include: {
  //     members: {
  //       where: {
  //         id: token.id,
  //       },
  //       include: {
  //         roles: {
  //           where: {
  //             clubId: clubId,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // return acceptedInvite;
};

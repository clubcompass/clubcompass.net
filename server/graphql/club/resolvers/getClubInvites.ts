import { Context } from "../../ctx";
import { Club } from "@prisma/client";

export type GetClubInvitesArgs = {
  clubId: Club["id"];
};

export type GetClubInvitesPayload = Awaited<ReturnType<typeof getClubInvites>>;

export const getClubInvites = async (
  _parent: any,
  { clubId }: GetClubInvitesArgs,
  { prisma }: Context
): Promise<typeof invites> => {
  const { invites } = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      invites: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              type: true,
              email: true,
              ccid: true,
            },
          },
          roles: {
            select: {
              id: true,
              name: true,
            },
          },
          status: true,
          type: true,
          createdAt: true,
        },
      },
    },
  });

  return invites;
};

import { Context } from "@apollo/client";
import { Club } from "@prisma/client";

export type GetClubRolesArgs = {
  clubId: Club["id"];
};

export type GetClubRolesPayload = Awaited<ReturnType<typeof getClubRoles>>;

export const getClubRoles = async (
  _parent: any,
  { clubId }: GetClubRolesArgs,
  { prisma }: Context
): Promise<typeof roles> => {
  const { roles } = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      roles: {
        select: {
          id: true,
          name: true,
          type: true,
          color: true,
        },
      },
    },
  });

  return roles;
};

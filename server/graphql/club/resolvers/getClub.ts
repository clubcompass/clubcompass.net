import { Club } from "@prisma/client";
import { Context } from "../../ctx";

export type GetClubArgs = {
  id: Club["id"];
  slug: Club["slug"];
};

export type GetClubPayload = Awaited<ReturnType<typeof getClub>>;

export const getClub = async (
  _parent: any,
  identifier: GetClubArgs,
  { prisma }: Context
): Promise<typeof club> => {
  const club = await prisma.club.findUnique({
    where: {
      ...identifier,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return club;
};

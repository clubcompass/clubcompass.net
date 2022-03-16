import { Context } from "../../ctx";

export type GetClubsArgs = {};

export type GetClubsPayload = Awaited<ReturnType<typeof getClubs>>;

export const getClubs = async (
  _parent: any,
  _args: GetClubsArgs,
  { prisma }: Context
): Promise<typeof clubs> => {
  const clubs = await prisma.club.findMany({
    where: {
      approval: {
        equals: true,
      },
    },
    include: {
      tags: {
        select: {
          name: true,
        },
      },

      _count: {
        select: {
          members: true,
        },
      },
    },
  });
  return clubs;
};

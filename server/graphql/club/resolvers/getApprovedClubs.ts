import { Context } from "../../ctx";

export type GetApprovedClubsArgs = {};

export type GetApprovedClubsPayload = Awaited<
  ReturnType<typeof getApprovedClubs>
>;

export const getApprovedClubs = async (
  _parent: any,
  _args: GetApprovedClubsArgs,
  { prisma }: Context
): Promise<typeof clubs> => {
  const clubs = await prisma.club.findMany({
    where: {
      approval: {
        equals: true,
      },
    },
    select: {
      name: true,
      slug: true,
      description: true,
      availability: true,
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

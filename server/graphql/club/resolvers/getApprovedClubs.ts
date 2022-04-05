import { Context } from "../../ctx";

export type GetApprovedClubsArgs = {};

export type GetApprovedClubsPayload = Awaited<
  ReturnType<typeof getApprovedClubs>
>;

export const getApprovedClubs = async (
  _parent: any,
  _args: GetApprovedClubsArgs,
  { prisma, auth: user }: Context
): Promise<typeof clubs & { isMember?: boolean }> => {
  const clubs = await prisma.club.findMany({
    where: {
      approval: {
        equals: true,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      availability: true,
      tags: {
        select: {
          name: true,
          id: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  // if user return approved clubs with isMember bool on each club, else return approved clubs
  if (user) {
    const userClubs = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        clubs: {
          select: {
            id: true,
          },
        },
      },
    });

    return clubs.map((club) => {
      const isMember = userClubs.clubs.some((c) => c.id === club.id);
      return { ...club, isMember };
    });
  }

  return clubs;
};

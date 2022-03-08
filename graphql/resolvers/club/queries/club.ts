import { Prisma, PrismaClient } from "@prisma/client";

export const club = async (
  _parent: any,
  q: Prisma.ClubWhereUniqueInput,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof club> => {
  const club = await prisma.club.findUnique({
    where: {
      ...q,
    },
    include: {
      links: true,
      tags: true,
      members: {
        include: {
          roles: {
            include: {
              _count: true,
            },
            where: {
              club: {
                ...q,
              },
            },
          },
        },
      },
    },
  });

  return club;
};

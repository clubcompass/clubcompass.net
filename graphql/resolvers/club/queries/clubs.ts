import { PrismaClient } from "@prisma/client";

type ParentInput = {
  id: number;
};

type GetClubsInput = {
  approved?: boolean;
};

export const clubs = async (
  { id }: ParentInput,
  { approved }: GetClubsInput,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof clubs> => {
  const clubs = await prisma.club.findMany({
    where: {
      ...(id ? { id } : {}),
      ...(approved == null
        ? approved
          ? { approval: "APPROVED" }
          : { approval: "UNAPPROVED" }
        : {}),
    },
    include: {
      tags: true,
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return clubs;
};

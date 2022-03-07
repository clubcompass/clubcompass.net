import { Prisma, PrismaClient } from "@prisma/client";

export const user = async (
  _parent: any,
  q: Prisma.UserWhereUniqueInput,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof user> => {
  const user = await prisma.user.findUnique({
    where: {
      ...q,
    },
    include: {
      interests: true,
    },
  });

  return user;
};

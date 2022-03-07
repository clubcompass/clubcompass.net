import { PrismaClient } from "@prisma/client";
type GetUserInput = {
  id?: number;
  ccid?: string;
  email?: string;
};

export const user = async (
  _parent: any,
  q: GetUserInput,
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

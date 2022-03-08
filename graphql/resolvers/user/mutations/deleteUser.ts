import { PrismaClient } from "@prisma/client";

type DeleteUserInput = {
  id: number;
};

export const deleteUser = async (
  _parent: any,
  { id }: DeleteUserInput,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof user> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

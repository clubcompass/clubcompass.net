import { Prisma, PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";

type CreateUserInput = {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    emailVerified: boolean;
    password: string;
    grade: string;
    type: string;
    interests: Prisma.TagWhereUniqueInput[];
  };
};

export const createUser = async (
  _parent: any,
  { user: { interests, ...rest } }: CreateUserInput,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof user> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, 6);

  const user = await prisma.user.create({
    data: {
      ccid: nanoid(),
      ...rest,
      interests: {
        connect: interests,
      },
    },
  });

  return user;
};

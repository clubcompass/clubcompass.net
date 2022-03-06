import { Prisma } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { prisma } from "../../../config/prisma";

type User = {
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  password: string;
  grade: string;
  type: string;
  interests: Prisma.TagWhereUniqueInput[];
};

export const createCustomUser = async (
  _: any,
  { interests, ...rest }: User
): Promise<Partial<User>> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, 6);

  const response = await prisma.user.create({
    data: {
      ccid: nanoid(),
      ...rest,
      interests: {
        connect: interests,
      },
    },
  });

  return response;
};

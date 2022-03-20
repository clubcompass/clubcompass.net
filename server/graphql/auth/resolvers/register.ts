import { customAlphabet } from "nanoid";
import * as bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Context } from "../../ctx";
// import type { AuthPayload, RegisterArgs } from "../types";
import { validate } from "../../../utils/validation";
import { newUserSchema } from "../../../utils/validation/schemas";
import { generateToken } from "../../../utils/auth";
import { User, Tag, Grade } from "@prisma/client";

export type RegisterData = Pick<
  User,
  "firstname" | "lastname" | "email" | "password" | "studentId"
> & { interests: Partial<Tag> } & { grade: Partial<Grade> };

export interface RegisterArgs {
  data: RegisterData;
}

export type RegisterPayload = Awaited<ReturnType<typeof register>>;

export const register = async (
  _parent: any,
  {
    data: { firstname, lastname, email, studentId, password, grade, interests },
  }: RegisterArgs,
  { prisma }: Context
): Promise<{
  user: typeof newUser;
  token: ReturnType<typeof generateToken>;
}> => {
  const { valid, errors } = await validate({
    schema: newUserSchema,
    data: {
      firstname,
      lastname,
      email,
      studentId,
      password,
      grade,
      interests,
    },
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user)
    throw new AuthenticationError("A user with that email already exists");

  // if (!user.emailVerified)
  //   throw new AuthenticationError("Email is not verified");

  const generateCCID = async (): Promise<string> => {
    const gen = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
    const ccid = gen();
    const user = await prisma.user.findUnique({ where: { ccid } });
    if (user) return generateCCID();
    return ccid;
  };

  const hashedPassword: string = await bcrypt.hash(password, 10);
  const ccid = await generateCCID();
  // shouldn't return user?
  const newUser = await prisma.user.create({
    data: {
      ccid,
      firstname,
      lastname,
      email,
      studentId,
      password: hashedPassword,
      grade,
      interests: {
        connect: interests,
      },
    },
  });

  return {
    user: newUser, // doesn't need to return user?
    token: generateToken({
      id: newUser.id,
      ccid: newUser.ccid,
      email: newUser.email,
    }),
  };
};

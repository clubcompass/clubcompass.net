import { User, Tag, Grade } from "@prisma/client";
import { customAlphabet } from "nanoid";
import * as bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { validate } from "../../../utils/validation";
import { newUserSchema } from "../../../utils/validation/schemas";
import { generateToken } from "../../../utils/auth";

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
  { prisma, setCookie }: Context
): Promise<typeof newUser & { pendingInvites: number; token: string }> => {
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
    select: {
      id: true,
      ccid: true,
      firstname: true,
      lastname: true,
      email: true,
      grade: true,
      emailVerified: true,
      active: true,
      type: true,
    },
  });

  const pendingInvites = await prisma.invite.count({
    where: {
      user: {
        id: newUser.id,
      },
      status: "PENDING",
    },
  });

  const token = generateToken({
    id: newUser.id,
    ccid: newUser.ccid,
    email: newUser.email,
    emailVerified: newUser.emailVerified,
    active: newUser.active,
    type: newUser.type,
    remember: false,
  });

  setCookie({
    name: "token",
    value: token,
    options: {
      maxAge: 86400,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  });

  return { ...newUser, pendingInvites, token };
};

import type { User } from "@prisma/client";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import * as bcrypt from "bcrypt";
import { Context } from "../../ctx";
import { validate } from "../../../utils/validation";
import { loginSchema } from "../../../utils/validation/schemas";
import { generateToken } from "../../../utils/auth";

export type LoginData = Pick<User, "email" | "password"> & {
  remember: boolean;
};

export interface LoginArgs {
  data: LoginData;
}

export type LoginPayload = Awaited<ReturnType<typeof login>>;

export const login = async (
  _parent: any,
  { data: { email, password, remember } }: LoginArgs,
  { prisma, setCookie }: Context
): Promise<typeof user & { pendingInvites: number; token: string }> => {
  const { valid, errors } = await validate({
    schema: loginSchema as any,
    data: {
      email,
      password,
      remember,
    },
  });

  if (!valid) throw new UserInputError("Invalid user input", { errors });

  const user = await prisma.user.findUnique({
    where: {
      email,
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
      password: true,
    },
  });
  if (!user)
    throw new AuthenticationError("A user with that email does not exist"); // Email or password incorrect

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AuthenticationError("Incorrect password!"); // Email or password incorrect

  const pendingInvites = await prisma.invite.count({
    where: {
      user: {
        id: user.id,
      },
      status: "PENDING",
    },
  });

  const token = generateToken({
    id: user.id,
    ccid: user.ccid,
    email: user.email,
    emailVerified: user.emailVerified,
    active: user.active,
    type: user.type,

    remember,
  });

  setCookie({
    // should be abstracted to a cookie helper
    name: "token",
    value: token,
    options: {
      maxAge: remember ? 604800 : 86400,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  });

  return { ...user, pendingInvites, token };
};

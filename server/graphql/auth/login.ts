import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Context } from "../ctx";
import type { AuthPayload, LoginArgs } from "./auth";
import { validate } from "../../utils/validation";
import { loginSchema } from "../../utils/validation/schemas";

const generateToken = ({
  id,
  ccid,
  email,
  remember,
}: {
  id: number;
  ccid: string;
  email: string;
  remember: boolean;
}): string =>
  jwt.sign(
    {
      id,
      ccid,
      email,
    },
    process.env.SECRET as string,
    { expiresIn: remember ? "10d" : "3d" }
  );

export const login = async (
  _parent: any,
  { data: { email, password, remember } }: { data: LoginArgs },
  { prisma }: Context
): Promise<AuthPayload> => {
  const { valid, errors } = await validate({
    schema: loginSchema as any,
    data: {
      email,
      password,
      remember,
    },
  });

  if (!valid) throw new UserInputError("Error", { errors });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user)
    throw new AuthenticationError("A user with that email does not exist"); // Email or password incorrect

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AuthenticationError("Incorrect password!"); // Email or password incorrect

  return {
    user,
    token: generateToken({
      id: user.id,
      ccid: user.ccid,
      email: user.email,
      remember,
    }),
  };
};

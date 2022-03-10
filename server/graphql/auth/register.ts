import { customAlphabet } from "nanoid";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Context } from "../ctx";
import type { AuthPayload, RegisterArgs } from "./auth";
import { validate } from "../../utils/validation";
import { newUserSchema } from "../../utils/validation/schemas";

const generateToken = ({
  id,
  ccid,
  email,
}: {
  id: number;
  ccid: string;
  email: string;
}): string =>
  jwt.sign(
    {
      id,
      ccid,
      email,
    },
    process.env.SECRET as string,
    { expiresIn: "3d" }
  );

export const register = async (
  _parent: any,
  {
    data: { firstname, lastname, email, password, grade, interests },
  }: { data: RegisterArgs },
  { prisma }: Context
): Promise<AuthPayload> => {
  const { valid, errors } = await validate({
    schema: newUserSchema as any,
    data: {
      firstname,
      lastname,
      email,
      password,
      grade,
      interests,
    },
  });

  if (!valid) throw new UserInputError("Error", { errors });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user)
    throw new AuthenticationError("A user with that email already exists");

  const generateCCID = async (): Promise<string> => {
    const ccid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
    const user = await prisma.user.findUnique({ where: { ccid: ccid() } });
    if (user) return generateCCID();
    return ccid();
  };

  const hashedPassword: string = await bcrypt.hash(password, 10);
  const ccid = await generateCCID();
  const newUser = await prisma.user.create({
    data: {
      ccid,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      grade,
      interests: {
        connect: interests,
      },
      emailVerified: false,
    },
  });

  return {
    user: newUser,
    token: generateToken({
      id: newUser.id,
      ccid: newUser.ccid,
      email: newUser.email,
    }),
  };
};

import type { User } from "@prisma/client";
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import * as bcrypt from "bcrypt";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type ChangePasswordArgs = {
  password: User["password"];
};

export type ChangePasswordPayload = Awaited<ReturnType<typeof changePassword>>;

export const changePassword = async (
  _parent: any,
  { password }: ChangePasswordArgs,
  { prisma, auth }: Context
): Promise<typeof user> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data"); // should probably regulate this

  const currentUser = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
    select: {
      password: true,
    },
  });

  if (await bcrypt.compare(password, currentUser.password)) {
    throw new UserInputError("Password matches current password/");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: {
      id: token.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return user;
};

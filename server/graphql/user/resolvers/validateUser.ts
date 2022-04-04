import { Context } from "../../ctx";
import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";

export type ValidateUserArgs = {
  ccid: User["ccid"];
};

export type ValidateUserPayload = Awaited<ReturnType<typeof validateUser>>;

export const validateUser = async (
  _parent: any,
  { ccid }: ValidateUserArgs,
  { prisma }: Context
): Promise<typeof user> => {
  const user = await prisma.user.findUnique({
    where: {
      ccid: ccid,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      ccid: true,
      email: true,
      type: true,
      active: true,
      emailVerified: true,
    },
  });

  if (!user) throw new ApolloError("User not found", "NO_USER", { ccid });
  if (user.active === false)
    throw new ApolloError("Requested user is not active", "CONSTRAINT_FAILED", {
      ccid,
    });
  if (user.emailVerified === false)
    throw new ApolloError("Email not verified", "CONSTRAINT_FAILED", {
      emailVerified: user.emailVerified,
    });

  return user;
};

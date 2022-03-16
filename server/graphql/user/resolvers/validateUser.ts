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
  });

  if (!user) throw new ApolloError("User does not found", "NO_USER", { ccid });

  return user;
};

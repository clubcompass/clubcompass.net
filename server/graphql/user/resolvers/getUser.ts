import { User } from "@prisma/client";
import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

export type GetUserArgs = {
  identifier:
    | { id: User["id"] }
    | { email: User["email"] }
    | { ccid: User["ccid"] };
};

export type GetUserPayload = Awaited<ReturnType<typeof getUser>>;

export const getUser = async (
  _parent: any,
  { identifier }: GetUserArgs,
  { prisma }: Context
): Promise<typeof user> => {
  const user = await prisma.user.findUnique({
    where: {
      ...identifier,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      active: true,
      type: true,
    },
  });

  if (!user) {
    throw new ApolloError("User was not found", "NO_USER", {
      [Object.keys(identifier)[0]]: identifier,
    });
  }

  if (user.active === false) {
    throw new ApolloError("User not approved", "UNAPPROVED_USER", {
      [Object.keys(identifier)[0]]: identifier,
    });
  }

  return user;
};

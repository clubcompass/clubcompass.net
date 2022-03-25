import { User } from "@prisma/client";
import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

export type GetUserArgs = {
  identifier:
    | { id: User["id"] }
    | { email: User["email"] }
    | { ccid: User["ccid"] };
  type?: User["type"];
};

export type GetUserPayload = Awaited<ReturnType<typeof getUser>>;

export const getUser = async (
  _parent: any,
  { identifier, type }: GetUserArgs,
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

  if (!user.active) {
    throw new ApolloError("User not approved", "UNAPPROVED_USER", {
      [Object.keys(identifier)[0]]: identifier,
    });
  }

  if (type && user.type !== type) {
    throw new ApolloError("User is not of the specified type", "WRONG_TYPE", {
      [Object.keys(identifier)[0]]: identifier,
      type,
    });
  }

  return user;
};

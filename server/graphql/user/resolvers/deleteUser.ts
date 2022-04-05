import { ApolloError } from "apollo-server-micro";
import type { User } from "@prisma/client";
import { Context } from "../../ctx";

export type DeleteUserArgs = {
  identifier:
    | { id: User["id"] }
    | { email: User["email"] }
    | { ccid: User["ccid"] };
};

export type DeleteUserPayload = Awaited<ReturnType<typeof deleteUser>>;

export const deleteUser = async (
  _: any,
  { identifier }: DeleteUserArgs,
  { prisma, auth: token }: Context
): Promise<typeof user> => {
  const exists = await prisma.user.findUnique({
    where: {
      ...identifier,
    },
    select: {
      id: true,
    },
  });

  if (!exists)
    throw new ApolloError("User was not found", "NO_USER", {
      [Object.keys(identifier)[0]]: identifier,
    });

  // if (token.id !== exists.id)
  //   throw new ApolloError(
  //     "You are not authorized to delete this user",
  //     "UNAUTHORIZED"
  //   );

  const user = await prisma.user.delete({
    // optimize payload (only return id?)
    where: {
      ...identifier,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
    },
  });

  return user;
};

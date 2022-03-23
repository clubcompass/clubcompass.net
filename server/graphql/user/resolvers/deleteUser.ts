import { ApolloError } from "apollo-server-micro";
import type { User } from "@prisma/client";
import { Context } from "../../ctx";

type DeleteUserArgs = {
  identifier:
    | { id: User["id"] }
    | { email: User["email"] }
    | { ccid: User["ccid"] };
};

export const deleteUser = async (
  _: any,
  { identifier }: DeleteUserArgs,
  { prisma }: Context
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

  console.log(user);
  return user;
};

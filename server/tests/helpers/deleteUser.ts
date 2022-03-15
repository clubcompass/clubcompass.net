import type { User } from "@prisma/client";
import { prisma } from "../../../config/prisma";

type DeleteUserArgs = {
  id?: User["id"];
  email?: User["email"];
  ccid?: User["ccid"];
};

export const deleteUser = async (
  unique: DeleteUserArgs
): Promise<typeof user> => {
  const user = await prisma.user.delete({
    where: {
      ...unique,
    },
  });
  return user;
};

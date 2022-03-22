import { User } from "@prisma/client";
import { Context } from "../../ctx";

export type DeleteUserArgs = {
  id: User["id"];
};

export type DeleteUserPayload = Awaited<ReturnType<typeof deleteUser>>;

export const deleteUser = async (
  _parent: any,
  { id }: DeleteUserArgs,
  { prisma, auth }: Context //!!!!!! add auth to get userId
): Promise<typeof user> => {
  console.log(id);
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  console.log(user);
  return user;
};

import { Context } from "../../ctx";
import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
export type ApproveUserArgs = {
  userId: User["id"];
};

export type ApproveUserPayload = Awaited<ReturnType<typeof approveUser>>;

export const approveUser = async (
  _parent: any,
  { userId }: ApproveUserArgs,
  { prisma }: Context
): Promise<typeof updatedUser> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ApolloError("User was not found", "NO_USER", { userId });

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      active: true,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      active: true,
    },
  });

  return updatedUser;
};

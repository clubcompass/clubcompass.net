import { User } from "@prisma/client";
import { Context } from "../../ctx";

export type batchDeleteUserArgs = {
  userIds: User["id"][];
};

export type batchDeleteUserPayload = Awaited<
  ReturnType<typeof batchDeleteUsers>
>;

export const batchDeleteUsers = async (
  _parent: any,
  { userIds }: batchDeleteUserArgs,
  { prisma, auth }: Context //!!!!!! add auth to get userId
): Promise<typeof users> => {
  // what happens if invalid user id?
  const users = await prisma.$transaction(
    userIds.map((userId) =>
      prisma.user.delete({
        where: {
          id: userId,
        },
        select: {
          firstname: true,
          lastname: true,
          studentId: true,
        },
      })
    )
  );

  return users;
};

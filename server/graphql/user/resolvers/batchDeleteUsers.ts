import { User } from "@prisma/client";
import { Context } from "../../ctx";

export type BatchDeleteUsersArgs = {
  userIds: User["id"][];
};

export type BatchDeleteUsersPayload = Awaited<
  ReturnType<typeof batchDeleteUsers>
>;

export const batchDeleteUsers = async (
  _parent: any,
  { userIds }: BatchDeleteUsersArgs,
  { prisma }: Context
): Promise<typeof users> => {
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

import { Context } from "../../ctx";
import { User } from "@prisma/client";

export type BatchApproveUsersArgs = {
  userIds: User["id"][];
};

export type BatchApproveUsersPayload = Awaited<
  ReturnType<typeof batchApproveUsers>
>;

export const batchApproveUsers = async (
  _parent: any,
  { userIds }: BatchApproveUsersArgs,
  { prisma }: Context
): Promise<typeof users> => {
  // what happens if invalid user id?
  const users = await prisma.$transaction(
    userIds.map((userId) =>
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          active: true,
        },
        select: {
          firstname: true,
          lastname: true,
          active: true,
        },
      })
    )
  );

  return users;
};

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
): Promise<typeof deletedUsers> => {
  const users = userIds.map((userId) =>
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
  );

  const deletedUsers = await prisma.$transaction(users);

  return deletedUsers;
};

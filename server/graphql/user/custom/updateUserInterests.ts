import { Context } from "../../ctx";

type updateInterests = {
  userId: number;
  tagIds: number[];
};
export const updateUserInterests = async (
  _parent: any,
  { userId, tagIds }: updateInterests,
  { prisma }: Context
): Promise<any> => {
  const interests = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      interests: {
        set: [],
        connect: interests,
      },
    },
    include: {
      interests: true,
    },
  });

  return user;
};

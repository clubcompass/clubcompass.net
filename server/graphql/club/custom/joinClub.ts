import { Context } from "../../ctx";

type JoinInput = {
  userId: number;
  clubId: number;
};
export const joinClub = async (
  _parent: any,
  { userId, clubId }: JoinInput,
  { prisma }: Context
): Promise<any> => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      clubs: {
        connect: {
          id: clubId,
        },
      },
    },
    include: {
      clubs: true,
    },
  });

  return user;
};

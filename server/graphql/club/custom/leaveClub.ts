import { Context } from "../../ctx";

type LeaveInput = {
  userId: number;
  clubId: number;
};
export const leaveClub = async (
  _parent: any,
  { userId, clubId }: LeaveInput,
  { prisma }: Context
): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      roles: true,
    },
  });

  const roles = Array.from([...user.roles], (role) => {
    if (role.clubId !== clubId) {
      return {
        id: role.id,
      };
    }
  });

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      clubs: {
        disconnect: {
          id: clubId,
        },
      },
      roles: {
        set: [],
        connect: roles,
      },
      canEdit: {
        disconnect: {
          id: clubId,
        },
      },
    },
    include: {
      clubs: true,
      roles: true,
    },
  });

  return response;
};

import { Context } from "../../ctx";
import { Club } from "@prisma/client";
import { getAuthenticatedUser, AuthPayload } from "./../../../utils/auth";

type LeaveInput = {
  // userId: number;
  clubId: Club["id"];
};
export const leaveClub = async (
  _parent: any,
  // { userId, clubId }: LeaveInput,
  { clubId }: LeaveInput,
  { prisma, auth }: Context
): Promise<any> => {
  const authPayload = getAuthenticatedUser({ auth });
  const user = await prisma.user.findUnique({
    where: {
      id: (<AuthPayload>authPayload)?.id,
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
      id: (<AuthPayload>authPayload)?.id,
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

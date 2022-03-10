import { User, Club } from "@prisma/client";
import { Context } from "../../ctx";
import { getAuthenticatedUser, AuthPayload } from "./../../../utils/auth";

type JoinInput = {
  // userId: User["id"];
  clubId: Club["id"];
};

export const joinClub = async (
  _parent: any,
  // { userId, clubId }: JoinInput,
  { clubId }: JoinInput,
  { prisma, auth }: Context
): Promise<typeof user> => {
  const user = getAuthenticatedUser({ auth });
  const updatedUser = await prisma.user.update({
    where: {
      id: (<AuthPayload>user).id,
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

  return updatedUser;
};

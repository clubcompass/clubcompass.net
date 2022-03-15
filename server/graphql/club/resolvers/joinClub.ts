import { Club } from "@prisma/client";
import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type JoinClubArgs = {
  clubId: Club["id"];
};

export type JoinClubPayload = Awaited<ReturnType<typeof joinClub>>;

export const joinClub = async (
  _parent: any,
  { clubId }: JoinClubArgs,
  { prisma, auth }: Context
): Promise<typeof user> => {
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new AuthenticationError("No token data");
  const user = await prisma.user.update({
    where: {
      id: token.id,
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

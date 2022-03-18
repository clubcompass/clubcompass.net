import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type FindUserBySessionArgs = {};

export type FindUserBySessionPayload = Awaited<
  ReturnType<typeof findUserBySession>
>;

export const findUserBySession = async (
  _parent: any,
  _: FindUserBySessionArgs,
  { prisma, auth }: Context
): Promise<typeof user & { pendingInvites: number }> => {
  const token = getAuthenticatedUser({ auth });

  if (!token) throw new AuthenticationError("No token data");

  const user = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
  });

  if (!user)
    throw new AuthenticationError("No user associated with token", {
      token,
    });

  const pendingInvites = await prisma.invite.count({
    where: {
      user: {
        id: user.id,
      },
      status: "PENDING",
    },
  });

  return { ...user, pendingInvites };
};

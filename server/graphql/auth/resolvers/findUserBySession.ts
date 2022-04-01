// import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type FindUserBySessionArgs = {};

export type FindUserBySessionPayload = Awaited<
  ReturnType<typeof findUserBySession>
>;

export const findUserBySession = async (
  _parent: any,
  _: FindUserBySessionArgs,
  { prisma, auth: token, rawToken }: Context
): Promise<typeof user & { pendingInvites: number; token: string }> => {
  const user = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
    select: {
      id: true,
      ccid: true,
      firstname: true,
      lastname: true,
      email: true,
      grade: true,
      emailVerified: true,
      active: true,
      type: true,
    },
  });

  const pendingInvites = await prisma.invite.count({
    where: {
      user: {
        id: user.id,
      },
      status: "PENDING",
    },
  });

  return { ...user, pendingInvites, token: rawToken };
};

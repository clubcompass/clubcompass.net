import { Context } from "../../ctx";
import { ApolloError } from "apollo-server-micro";

export type GetUserProfileArgs = {};

export type GetUserProfilePayload = Awaited<ReturnType<typeof getUserProfile>>;

export const getUserProfile = async (
  _parent: any,
  _args: GetUserProfileArgs,
  { prisma, auth }: Context
): Promise<typeof user> => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      grade: true,
      studentId: true,
      interests: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
      id: auth.id,
    });

  return user;
};

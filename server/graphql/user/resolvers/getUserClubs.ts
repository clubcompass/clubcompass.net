import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";
import { ApolloError } from "apollo-server-micro";

export type GetUserClubsArgs = {};

export type GetUserClubsPayload = Awaited<ReturnType<typeof getUserClubs>>;

export const getUserClubs = async (
  _parent: any,
  _args: GetUserClubsArgs,
  { prisma, auth }: Context
): Promise<typeof clubs> => {
  // gets just approved clubs for user
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new ApolloError("No token data");

  const { clubs } = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
    select: {
      clubs: {
        where: {
          approval: "APPROVED",
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          tags: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              members: true,
            },
          },
        },
      },
    },
  });
  // .clubs({
  //   where: {
  //     approval: {
  //       equals: "APPROVED",
  //     },
  //   },
  // });

  return clubs;
};

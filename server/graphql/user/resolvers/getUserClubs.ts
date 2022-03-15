import { inspect } from "util";
import { Context } from "../../ctx";
import { getAuthenticatedUser } from "../../../utils/auth";

export type GetUserClubsArgs = {};

export type GetUserClubsPayload = Awaited<ReturnType<typeof getUserClubs>>;

export const getUserClubs = async (
  _parent: any,
  _args: GetUserClubsArgs,
  { prisma, auth }: Context
): Promise<typeof clubs> => {
  // gets just approved clubs for user
  const token = getAuthenticatedUser({ auth });
  if (!token) throw new Error("No token data");

  const clubs = await prisma.user
    .findUnique({
      where: {
        id: token.id,
      },
    })
    .clubs({
      where: {
        approval: {
          equals: "APPROVED",
        },
      },
    });

  console.log(token.id);

  return clubs;
};

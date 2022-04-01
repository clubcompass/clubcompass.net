import { Context } from "../../ctx";

export type GetUserUnapprovedClubsArgs = {};

export type GetUserUnapprovedClubsPayload = Awaited<
  ReturnType<typeof getUserUnapprovedClubs>
>;

export const getUserUnapprovedClubs = async (
  _parent: any,
  _args: GetUserUnapprovedClubsArgs,
  { prisma, auth: user }: Context
): Promise<typeof clubs> => {
  const { clubs } = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      clubs: {
        where: {
          approval: false,
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
          status: true,
        },
      },
    },
  });

  return clubs;
};

import { Context } from "../../ctx";

export type GetUnapprovedClubsArgs = {};

export type GetUnapprovedClubsPayload = Awaited<
  ReturnType<typeof getUnapprovedClubs>
>;

export const getUnapprovedClubs = async (
  _parent: any,
  _args: GetUnapprovedClubsArgs,
  { prisma }: Context
): Promise<typeof clubs> => {
  const clubs = await prisma.club.findMany({
    where: {
      approval: {
        equals: false,
      },
    },
    select: {
      id: true,
      name: true,
      availability: true,
      createdAt: true,
      teacher: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
      roles: {
        where: {
          name: "president",
        },
        select: {
          name: true,
          users: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return clubs;
};

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
  const unapprovedClubs = await prisma.club.findMany({
    where: {
      approval: {
        equals: false,
      },
      AND: {
        status: {
          equals: "REVIEW",
        },
      },
    },
    select: {
      id: true,
      name: true,
      availability: true,
      createdAt: true,
      roles: {
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

  const clubs = unapprovedClubs.map(
    ({ id, name, availability, createdAt, roles, _count }) => {
      return {
        id: id,
        name: name,
        availability: availability,
        createdAt: new Date(createdAt).toLocaleDateString("en-US"),
        presidents: roles.find((role) => role.name === "President").users,
        advisors: roles.find((role) => role.name === "Advisor").users,
        _count: _count.members,
      };
    }
  );

  return clubs;
};

import { Context } from "../../ctx";

export type GetAdminApprovedClubsArgs = {};

export type GetAdminApprovedClubsPayload = Awaited<
  ReturnType<typeof getAdminApprovedClubs>
>;

export const getAdminApprovedClubs = async (
  _parent: any,
  _args: GetAdminApprovedClubsArgs,
  { prisma }: Context
): Promise<typeof clubs> => {
  const approvedClubs = await prisma.club.findMany({
    where: {
      approval: {
        equals: true,
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      availability: true,
      updatedAt: true,
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

  const clubs = approvedClubs.map(
    ({ id, slug, name, availability, updatedAt, roles, teacher, _count }) => {
      return {
        name,
        slug,
        availability,
        updatedAt: new Date(updatedAt).toLocaleDateString("en-US"),
        president: `${roles[0].users[0].firstname} ${roles[0].users[0].lastname}`,
        teacher: `${teacher.firstname} ${teacher.lastname}`,
        members: _count.members,
        delete: {
          id,
          name,
          members: _count.members,
        },
      };
    }
  );

  return clubs;
};

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

  const clubs = unapprovedClubs.map(
    ({ id, name, availability, createdAt, roles, teacher, _count }) => {
      // console.log(roles); // when deleting on user cascade, roles can be empty causing an error on president property
      return {
        id: id,
        name: name,
        availability: availability,
        createdAt: new Date(createdAt).toLocaleDateString("en-US"),
        president: `${roles[0].users[0].firstname} ${roles[0].users[0].lastname}`,
        teacher: `${teacher.firstname} ${teacher.lastname}`,
        _count: _count.members,
      };
    }
  );

  return clubs;
};

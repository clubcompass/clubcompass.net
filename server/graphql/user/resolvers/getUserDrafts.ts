import { Context } from "../../ctx";

export type GetUserDraftsArgs = {};

export type GetUserDraftsPayload = Awaited<ReturnType<typeof getUserDrafts>>;

export const getUserDrafts = async (
  _parent: any,
  _args: GetUserDraftsArgs,
  { prisma, auth }: Context
): Promise<typeof clubs> => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      clubs: {
        where: {
          status: "DRAFT",
        },
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          email: true,
          meetingDate: true,
          location: true,
          tags: {
            select: {
              name: true,
            },
          },
          roles: {
            select: {
              name: true,
              users: {
                select: {
                  id: true,
                },
              },
            },
          },
          teacher: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const clubs = user.clubs.map((club) => {
    let todo = [];

    if (!club.description) todo.push("Provide a description");
    if (!club.email) todo.push("Provide an email");
    if (!club.meetingDate) todo.push("Choose a meeting date");
    if (!club.location) todo.push("Pick a location");
    if (!club.tags) todo.push("Choose club tags");
    if (!club.teacher) todo.push("Invite an advisor");
    club.roles.map((role) => {
      if (role.users.length === 0) todo.push(`Invite a ${role.name}`);
    });

    return {
      id: club.id,
      name: club.name,
      slug: club.slug,
      todos: todo,
    };
  });

  return clubs;
};

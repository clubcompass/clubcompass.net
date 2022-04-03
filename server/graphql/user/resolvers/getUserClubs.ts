import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type GetUserClubsArgs = {};

export type GetUserClubsPayload = Awaited<ReturnType<typeof getUserClubs>>;

export const getUserClubs = async (
  _parent: any,
  _args: GetUserClubsArgs,
  { prisma, auth }: Context
): Promise<typeof response> => {
  const user = await prisma.user.findUnique({
    where: {
      id: auth.id,
    },
    select: {
      clubs: {
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          email: true,
          meetingDate: true,
          location: true,
          status: true,
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
      canEdit: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
      id: auth.id,
    });

  const drafts = user.clubs.filter((club) => {
    if (
      (club.status === "DRAFT" || club.status === "REVIEW") &&
      club.roles.some(
        (role) =>
          role.name === "president" &&
          role.users.some((user) => {
            return user.id === auth.id;
          })
      )
    )
      return club;
  });

  const formattedDrafts = drafts.map((draft) => {
    let tasks = [];

    draft.description
      ? tasks.push({ message: "Provide a description", completed: true })
      : tasks.push({ message: "Provide a description", completed: false });
    draft.email
      ? tasks.push({ message: "Provide an email", completed: true })
      : tasks.push({ message: "Provide an email", completed: false });
    draft.meetingDate
      ? tasks.push({ message: "Choose a meeting date", completed: true })
      : tasks.push({ message: "Choose a meeting date", completed: false });
    draft.location
      ? tasks.push({ message: "Pick a location", completed: true })
      : tasks.push({ message: "Pick a location", completed: false });
    draft.tags
      ? tasks.push({ message: "Choose club tags", completed: true })
      : tasks.push({ message: "Choose club tags", completed: false });
    draft.teacher
      ? tasks.push({ message: "Invite an advisor", completed: true })
      : tasks.push({ message: "Invite an advisor", completed: false });
    draft.roles.map((role) => {
      role.users.length === 0
        ? tasks.push({ message: `Invite a ${role.name}`, completed: false })
        : tasks.push({ message: `Invite a ${role.name}`, completed: true });
    });

    return {
      id: draft.id,
      name: draft.name,
      slug: draft.slug,
      tasks: tasks,
      completed: tasks.filter((task) => task.completed).length,
      total: tasks.length,
    };
  });

  const unformattedClubs = user.clubs.filter((club) => {
    const roles = club.roles.filter((role) => {
      if (role.users.some((user) => user.id === auth.id)) return role;
    });
    club.roles = roles;

    if (club.status === "APPROVED") return club;
  });

  const clubs = unformattedClubs.map((club) => ({
    ...club,
    president: false,
    manage: false,
  }));

  const presidentOf = clubs.filter((club) => {
    if (club.roles.some((role) => role.name === "president")) {
      club.president = true;
      club.manage = true;
      return club;
    }
  });

  const editorOf = clubs.filter((club) => {
    if (
      user.canEdit.some((canEdit) => canEdit.id === club.id) &&
      !club.roles.some((role) => role.name === "president")
    ) {
      club.president = false;
      club.manage = true;
      return club;
    }
  });

  const cantEdit = clubs.filter((club) => {
    if (!user.canEdit.some((canEdit) => canEdit.id === club.id)) {
      club.president = false;
      club.manage = false;
      return club;
    }
  });

  const leadershipClubs = [...presidentOf, ...editorOf, ...cantEdit];

  const nonLeadershipClubs = clubs.filter((club) => {
    if (!leadershipClubs.includes(club)) return club;
  });

  [...leadershipClubs, ...nonLeadershipClubs].map((club) => {
    delete club["description"];
    delete club["email"];
    delete club["teacher"];
    delete club["canEdit"];
    delete club["tags"];
  });

  const response = {
    leaderOf: leadershipClubs,
    memberOf: nonLeadershipClubs,
    drafts: formattedDrafts,
  };

  return response;
};

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
      club.roles.some((role) => role.name === "president") &&
      club.status === "DRAFT"
    )
      return club;
  });

  const formattedDrafts = drafts.map((draft) => {
    let todo = [];

    if (!draft.description) todo.push("Provide a description");
    if (!draft.email) todo.push("Provide an email");
    if (!draft.meetingDate) todo.push("Choose a meeting date");
    if (!draft.location) todo.push("Pick a location");
    if (!draft.tags) todo.push("Choose club tags");
    if (!draft.teacher) todo.push("Invite an advisor");
    draft.roles.map((role) => {
      if (role.users.length === 0) todo.push(`Invite a ${role.name}`);
    });

    return {
      id: draft.id,
      name: draft.name,
      slug: draft.slug,
      todos: todo,
    };
  });

  const clubs = user.clubs.filter((club) => {
    if (
      !(
        club.roles.some((role) => role.name === "president") &&
        club.status === "DRAFT"
      )
    ) {
      return club;
    }
  });

  clubs.map((club) => {
    const roles = club.roles.filter((role) => {
      if (role.users.some((user) => user.id === auth.id)) return role;
    });
    club.roles = roles;
  });

  const presidentOf = clubs.filter((club) => {
    if (
      club.roles.some((role) => role.name === "president") &&
      club.status !== "DRAFT"
    ) {
      return club;
    }
  });

  const editorOf = clubs.filter((club) => {
    if (
      user.canEdit.some((canEdit) => canEdit.id === club.id) &&
      !club.roles.some((role) => role.name === "president")
    ) {
      return club;
    }
  });

  const cantEdit = clubs.filter((club) => {
    if (!user.canEdit.some((canEdit) => canEdit.id === club.id)) {
      return club;
    }
  });

  const leadershipClubs = {
    presidentOf: presidentOf,
    editorOf: editorOf,
    cantEdit: cantEdit,
  };

  const nonLeadershipClubs = clubs.filter((club) => {
    if (
      ![...presidentOf, ...editorOf, ...cantEdit].includes(club) &&
      !drafts.includes(club)
    ) {
      return club;
    }
  });

  [...presidentOf, ...editorOf, ...cantEdit, ...nonLeadershipClubs].map(
    (club) => {
      delete club["description"];
      delete club["email"];
      delete club["teacher"];
      delete club["canEdit"];
      delete club["tags"];
    }
  );

  // const formattedClubs = [...leadershipClubs, ...nonLeadershipClubs];

  const response = {
    leaderOf: leadershipClubs,
    memberOf: nonLeadershipClubs,
    drafts: formattedDrafts,
  };

  console.log(response);

  return response;
};

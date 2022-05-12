import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type GetUserClubsArgs = {};

export type GetUserClubsPayload = Awaited<ReturnType<typeof getUserClubs>>;

export const getUserClubs = async (
  _parent: any,
  _args: GetUserClubsArgs,
  { prisma, auth }: Context
) => {
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
              permanent: true,
              type: true,
              users: {
                select: {
                  id: true,
                },
              },
              permissions: {
                select: {
                  canManageClubPage: true,
                  canManageInvites: true,
                  canManageMembers: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const clubsRoleFiltered = user.clubs.filter((club) =>
    club.roles.filter((role) => role.users.some((user) => user.id === auth.id))
  );

  const drafts = clubsRoleFiltered.filter(
    (club) =>
      club.status === "DRAFT" ||
      club.status === "REVIEW" ||
      (club.status === "DECLINED" &&
        club.roles.some((role) => role.name === "PRESIDENT"))
  );

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
    draft.roles.map((role) => {
      if (role.permanent === true) {
        role.users.length === 0
          ? tasks.push({ message: `Invite a ${role.name}`, completed: false })
          : tasks.push({ message: `Invite a ${role.name}`, completed: true });
      }
    });

    tasks.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      if (a.completed === false) return -1;
      return 1;
    });

    return {
      id: draft.id,
      name: draft.name,
      slug: draft.slug,
      status: draft.status,
      tasks: tasks,
      completed: tasks.filter((task) => task.completed).length,
      total: tasks.length,
    };
  });

  const clubs = user.clubs.filter((club) => club.status === "APPROVED");

  const presidentOf = clubs.filter((club) =>
    club.roles.filter((role) => role.type === "PRESIDENT")
  );

  const leadershipClubs = clubs.filter((club) =>
    club.roles.filter((role) => role.type === "LEADER")
  );

  leadershipClubs.sort((a, b) => {
    const aPermissions = a.roles.filter(
      (role) =>
        role.permissions.canManageClubPage ||
        role.permissions.canManageInvites ||
        role.permissions.canManageMembers
    );
    const bPermissions = b.roles.filter(
      (role) =>
        role.permissions.canManageClubPage ||
        role.permissions.canManageInvites ||
        role.permissions.canManageMembers
    );
    if (aPermissions.length === 0 && bPermissions.length === 0) return 0;
    if (aPermissions.length === 0) return 1;
    if (bPermissions.length === 0) return -1;
  });

  const nonLeadershipClubs = clubs.filter((club) =>
    club.roles.filter((role) => role.type === "MEMBER")
  );

  nonLeadershipClubs.sort((a, b) => {
    const aPermissions = a.roles.filter(
      (role) =>
        role.permissions.canManageClubPage ||
        role.permissions.canManageInvites ||
        role.permissions.canManageMembers
    );
    const bPermissions = b.roles.filter(
      (role) =>
        role.permissions.canManageClubPage ||
        role.permissions.canManageInvites ||
        role.permissions.canManageMembers
    );
    if (aPermissions.length === 0 && bPermissions.length === 0) return 0;
    if (aPermissions.length === 0) return 1;
    if (bPermissions.length === 0) return -1;
  });

  return {
    leaderOf: [...presidentOf, ...leadershipClubs],
    nonLeaderOf: nonLeadershipClubs,
    drafts: formattedDrafts,
  };
};

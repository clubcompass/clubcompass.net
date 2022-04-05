import { User, Role, Club } from "@prisma/client";
import { ApolloError } from "apollo-server-micro";
import { Context } from "../../ctx";

export type UpdateUserRolesArgs = {
  userId: User["id"];
  roles: Role[];
  clubId?: Club["id"];
};

export type UpdateUserRolesPayload = Awaited<
  ReturnType<typeof updateUserRoles>
>;

export const updateUserRoles = async (
  _parent: any,
  { userId, roles, clubId }: UpdateUserRolesArgs,
  { prisma, auth }: Context
): Promise<typeof response> => {
  console.log("userId: ", userId);
  console.log("roles: ", roles);
  console.log("clubId: ", clubId);

  const club = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    select: {
      id: true,
      roles: {
        where: {
          name: {
            equals: "president",
          },
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      },
      members: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!club)
    throw new ApolloError("Club was not found", "RESOURCE_NOT_FOUND", {
      clubId,
    });

  let ids = club.roles[0].users.map((user) => user.id);
  if (!ids.includes(auth.id)) {
    throw new ApolloError(
      "You are not authorized to issue an invite to this club",
      "UNAUTHORIZED_ACTION",
      { id: auth.id }
    );
  }

  if (club.members.length === 0)
    throw new ApolloError(
      "User is not a member of club",
      "UNAUTHORIZED_ACTION",
      { userId }
    );

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      roles: {
        where: {
          clubId: clubId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!user)
    throw new ApolloError("User not found", "RESOUCE_NOT_FOUND", { userId });

  if (roles.length === 0) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connect: roles,
        },
      },
    });
  } else if (user.roles.length !== 0) {
    const removeRoles = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          disconnect: user.roles,
        },
      },
    });

    const addRoles = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connect: roles,
        },
      },
    });

    await prisma.$transaction([removeRoles, addRoles]);
  } else {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          connect: roles,
        },
      },
    });
  }

  const response = { status: "success", message: "Roles updated" };

  return response;
};

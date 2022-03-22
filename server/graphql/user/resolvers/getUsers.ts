import { Context } from "../../ctx";

export type GetUsersArgs = {
  type: "APPROVED" | "UNAPPROVED" | "ALL";
};

export type GetUsersPayload = Awaited<ReturnType<typeof getUsers>>;

export const getUsers = async (
  _parent: any,
  { type }: GetUsersArgs,
  { prisma }: Context
): Promise<typeof users> => {
  if (type === "APPROVED") {
    const users = await prisma.user.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        studentId: true,
        grade: true,
        clubs: {
          where: {
            status: "APPROVED",
          },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return users;
  } else if (type === "UNAPPROVED") {
    const users = await prisma.user.findMany({
      where: {
        active: false,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        studentId: true,
        grade: true,
        clubs: {
          where: {
            status: "APPROVED",
          },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return users;
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      studentId: true,
      grade: true,
      clubs: {
        where: {
          status: "APPROVED",
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return users;
};

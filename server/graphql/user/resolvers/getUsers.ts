import { User } from "@prisma/client";
import { Context } from "../../ctx";

export type GetUsersArgs = {
  active: boolean;
};

export type GetUsersPayload = Awaited<ReturnType<typeof getUsers>>;

type UserPayload = Pick<
  User,
  "id" | "email" | "studentId" | "grade" | "firstname" | "lastname"
>;

export const getUsers = async (
  _parent: any,
  { active }: GetUsersArgs,
  { prisma }: Context
): Promise<typeof users> => {
  const parseUsers = (
    users: UserPayload[]
  ): (Omit<UserPayload, "firstname" | "lastname"> & { fullname: string })[] => {
    return users.map(({ id, firstname, lastname, email, studentId, grade }) => {
      return {
        id,
        fullname: `${firstname} ${lastname}`,
        email,
        studentId,
        grade,
      };
    });
  };

  if (active) {
    const allUsers = await prisma.user.findMany({
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
      },
    });

    const users = parseUsers(allUsers);

    return users;
  } else if (!active) {
    const allUsers = await prisma.user.findMany({
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
      },
    });
    const users = parseUsers(allUsers);

    return users;
  }

  const allUsers = await prisma.user.findMany({
    // this doesn't run
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      studentId: true,
      grade: true,
    },
  });

  const users = parseUsers(allUsers);

  return users;
};

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
    });

    return users;
  } else if (type === "UNAPPROVED") {
    const users = await prisma.user.findMany({
      where: {
        active: false,
      },
    });

    return users;
  }

  const users = await prisma.user.findMany();

  return users;
};

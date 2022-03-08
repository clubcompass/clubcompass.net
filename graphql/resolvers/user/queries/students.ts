import { PrismaClient } from "@prisma/client";
// https://www.wisdomgeek.com/development/web-development/graphql/resolving-nested-queries-graphql/
export const students = async (
  _parent: any,
  _args: any,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof students> => {
  const students = await prisma.user.findMany({
    where: {
      type: "STUDENT",
    },
    include: {
      clubs: true,
      roles: true,
      canEdit: true,
      advisor: true,
      invites: {
        include: {
          club: true,
        },
      },
    },
  });

  return students;
};

import { PrismaClient } from "@prisma/client";
// https://www.wisdomgeek.com/development/web-development/graphql/resolving-nested-queries-graphql/
export const teachers = async (
  _parent: any,
  _args: any,
  { prisma }: { prisma: PrismaClient }
): Promise<typeof teachers> => {
  const teachers = await prisma.user.findMany({
    where: {
      type: "TEACHER",
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

  return teachers;
};

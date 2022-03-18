import { Context } from "../../ctx";
import { Club } from "../../types/schemaTypes";

export type DeleteClubArgs = {
  clubId: Club["id"];
};

export type DeleteClubPayload = Awaited<ReturnType<typeof deleteClub>>;

export const deleteClub = async (
  _parent: any,
  { clubId }: DeleteClubArgs,
  { prisma }: Context
): Promise<typeof club> => {
  // refactor to onDelete cascade
  const club = await prisma.club.delete({
    where: {
      id: clubId,
    },
  });
  // const data = await prisma.club.findUnique({
  //   where: {
  //     id: id,
  //   },
  //   include: {
  //     applicationInfo: true,
  //   },
  // });

  // const deleteRoles = prisma.role.deleteMany({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteLinks = prisma.link.deleteMany({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteExpenses = prisma.projectedRevenue.deleteMany({
  //   where: {
  //     clubId: data.applicationInfo.id,
  //   },
  // });

  // const deleteRevenue = prisma.projectedExpenses.deleteMany({
  //   where: {
  //     clubId: data.applicationInfo.id,
  //   },
  // });

  // const deleteInvites = prisma.invite.deleteMany({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteApplicationInfo = prisma.clubApplicationInfo.delete({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteClub = prisma.club.delete({
  //   where: {
  //     id: id,
  //   },
  // });

  return club;
};

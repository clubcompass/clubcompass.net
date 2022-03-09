import { Context } from "../../ctx";

type DeleteClubInput = {
  id: number;
};
export const deleteClub = async (
  _parent: any,
  { id }: DeleteClubInput,
  { prisma }: Context
): Promise<any> => {
  const data = await prisma.club.findUnique({
    where: {
      id: id,
    },
    include: {
      applicationInfo: true,
    },
  });

  const deleteRoles = prisma.role.deleteMany({
    where: {
      clubId: id,
    },
  });

  const deleteLinks = prisma.link.deleteMany({
    where: {
      clubId: id,
    },
  });

  const deleteExpenses = prisma.projectedRevenue.deleteMany({
    where: {
      clubId: data.applicationInfo.id,
    },
  });

  const deleteRevenue = prisma.projectedExpenses.deleteMany({
    where: {
      clubId: data.applicationInfo.id,
    },
  });

  const deleteInvites = prisma.invite.deleteMany({
    where: {
      clubId: id,
    },
  });

  const deleteApplicationInfo = prisma.clubApplicationInfo.delete({
    where: {
      clubId: id,
    },
  });

  const deleteClub = prisma.club.delete({
    where: {
      id: id,
    },
  });

  const club = await prisma.$transaction([
    deleteRoles,
    deleteLinks,
    deleteExpenses,
    deleteRevenue,
    deleteInvites,
    deleteApplicationInfo,
    deleteClub,
  ]);

  return club[6];
};

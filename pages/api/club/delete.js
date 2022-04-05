import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  // const { id } = req.body;

  // const id = 8;

  // const data = await prisma.club.findUnique({
  //   where: {
  //     id: id,
  //   },
  //   include: {
  //     applicationInfo: true,
  //   },
  // });

  // const deleteRoles = await prisma.role.deleteMany({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteLinks = await prisma.link.deleteMany({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteExpenses = await prisma.projectedRevenue.deleteMany({
  //   where: {
  //     clubId: data.applicationInfo.id,
  //   },
  // });

  // const deleteRevenue = await prisma.projectedExpenses.deleteMany({
  //   where: {
  //     clubId: data.applicationInfo.id,
  //   },
  // });

  // const deleteInvites = prisma.invite.deleteMany({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteApplicationInfo = await prisma.clubApplicationInfo.delete({
  //   where: {
  //     clubId: id,
  //   },
  // });

  // const deleteClub = await prisma.club.delete({
  //   where: {
  //     id: id,
  //   },
  // });

  // const club = await prisma.$transaction([
  //   deleteRoles,
  //   deleteLinks,
  //   deleteExpenses,
  //   deleteRevenue,
  //   deleteInvites,
  //   deleteApplicationInfo,
  //   deleteClub,
  // ]);

  const id = 12;

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

  return res.status(200).json({ club });
};

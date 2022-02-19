import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id } = req.body;

  await prisma.role.deleteMany({
    where: {
      clubId: id,
    },
  });

  await prisma.clubApplicationInfo.delete({
    where: {
      clubId: id,
    },
  });

  const response = await prisma.club.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json({ ...response });
};

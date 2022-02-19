import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { clubId, teacherId } = req.body;

  const response = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      applicationInfo: {
        teacher: {
          connect: {
            id: teacherId,
          },
        },
      },
    },
    include: {
      applicationInfo: {
        teacher: true,
      },
    },
  });

  return res.status(200).json({ ...response });
};

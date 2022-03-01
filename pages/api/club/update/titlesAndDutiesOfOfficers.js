import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, titlesAndDutiesOfOfficers } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      applicationInfo: {
        update: {
          titlesAndDutiesOfOfficers: titlesAndDutiesOfOfficers,
        },
      },
    },
    include: {
      applicationInfo: true,
    },
  });

  return res.status(200).json({ ...response });
};

import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, selectionOfOfficers } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      applicationInfo: {
        update: {
          selectionOfOfficers: selectionOfOfficers,
        },
      },
    },
    include: {
      applicationInfo: true,
    },
  });

  return res.status(200).json({ ...response });
};

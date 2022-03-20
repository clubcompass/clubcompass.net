import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, membershipRequirements } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      applicationInfo: {
        update: {
          membershipRequirements: membershipRequirements,
        },
      },
    },
    include: {
      applicationInfo: true,
    },
  });

  return res.status(200).json({ ...response });
};

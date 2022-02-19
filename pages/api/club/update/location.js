import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, location } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      location: location,
    },
  });

  return res.status(200).json({ ...response });
};

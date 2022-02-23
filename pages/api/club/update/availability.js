import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, availability } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      availability: availability,
    },
  });

  return res.status(200).json({ ...response });
};

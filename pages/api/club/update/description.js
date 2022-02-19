import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, description } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      description: description,
    },
  });

  return res.status(200).json({ ...response });
};

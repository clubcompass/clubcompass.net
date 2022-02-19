import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, color } = req.body;

  const response = await prisma.role.update({
    where: {
      id: id,
    },
    data: {
      color: color,
    },
  });

  return res.status(200).json({ ...response });
};

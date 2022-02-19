import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, type } = req.body;

  const response = await prisma.role.update({
    where: {
      id: id,
    },
    data: {
      type: type,
    },
  });

  return res.status(200).json({ ...response });
};

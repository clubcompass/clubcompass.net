import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, name } = req.body;

  const response = await prisma.tag.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return res.status(200).json({ ...response });
};

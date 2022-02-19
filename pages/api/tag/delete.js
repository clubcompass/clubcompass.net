import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id } = req.body;

  const response = await prisma.tag.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json({ ...response });
};

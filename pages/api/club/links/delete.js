import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { linkId } = req.body;

  const response = await prisma.link.delete({
    where: {
      id: linkId,
    },
  });

  return res.status(200).json({ ...response });
};

import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id } = req.query;

  const { links } = await prisma.club.findUnique({
    where: {
      id: id,
    },
    select: {
      links: true,
    },
  });

  return res.status(200).json([...links]);
};

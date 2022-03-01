import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const response = await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          clubs: true,
        },
      },
    },
  });
  return res.status(200).json([...response]);
};

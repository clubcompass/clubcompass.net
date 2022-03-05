import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { status } = req.query;

  if (status === "APPROVED") {
    const response = await prisma.tag.findMany({
      include: {
        clubs: {
          where: {
            approval: "APPROVED",
          },
        },
      },
    });

    response.map((tag) => {
      tag._count = tag.clubs.length;
      delete tag.clubs;
    });

    return res.status(200).json([...response]);
  }

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

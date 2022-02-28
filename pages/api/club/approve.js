import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";

export default async (req, res) => {
  const { id } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      approval: "APPROVED",
      status: "APPROVED",
    },
  });

  const clubs = await prisma.club.findMany({
    where: {
      approval: "APPROVED",
      status: "APPROVED",
    },
    include: {
      tags: true,
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  await redis.connect();

  await redis.set("approved_clubs", JSON.stringify(clubs));

  await redis.quit();

  return res.status(200).json({ ...response });
};

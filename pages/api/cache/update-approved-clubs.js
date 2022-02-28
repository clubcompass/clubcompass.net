import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";

export default async (req, res) => {
  const clubs = await prisma.club.findMany({
    where: {
      approval: "APPROVED",
      status: "APPROVED",
    },
    include: {
      tags: true,
    },
  });

  await redis.connect();

  const response = await redis.set("approved_clubs", JSON.stringify(clubs));

  await redis.quit();

  res.status(200).json({ response });
};

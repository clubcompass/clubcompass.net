import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";

export default async (req, res) => {
  const clubs = await prisma.club.findMany({
    include: {
      applicationInfo: {
        include: {
          teacher: true,
        },
      },
      links: true,
      tags: true,
      members: {
        include: {
          roles: true,
        },
      },
      editors: true,
      roles: true,
    },
  });

  await redis.connect();

  const response = await redis.set("clubs", JSON.stringify(clubs));

  await redis.quit();

  res.status(200).json({ response });
};

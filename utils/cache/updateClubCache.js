import { redis } from "../../config/redis";

export const updateCache = async () => {
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

  return await redis.quit();
};

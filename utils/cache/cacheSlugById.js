import { redis } from "../../config/redis";
import { prisma } from "../../config/prisma";

export const cacheSlugById = async (id) => {
  const club = await prisma.club.findUnique({
    where: {
      id: id,
    },
    include: {
      links: true,
      tags: true,
      members: {
        include: {
          roles: true,
        },
      },
    },
  });

  await redis.connect();

  await redis.set(club.slug, JSON.stringify(club));

  return await redis.quit();
};

import { redis } from "../../config/redis";

export const cacheBySlug = async (club) => {
  await redis.connect();

  await redis.set(club.slug, JSON.stringify(club));

  return await redis.quit();
};

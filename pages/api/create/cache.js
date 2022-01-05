import { prisma } from "../../../config/prisma";
// import { createClient } from "redis";
import { redis } from "../../../config/redis";

const cache = async (req, res) => {
  const clubs = await prisma.club.findMany({
    include: {
      tags: true,
      president: true,
    },
  });

  // console.log(clubs);

  await redis.connect();

  const response = await redis.set("clubs", JSON.stringify(clubs));

  await redis.quit();

  res.status(200).json({ response });
};

export default cache;

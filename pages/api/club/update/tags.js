import { prisma } from "../../../../config/prisma";
import { redis } from "../../../../config/redis";

export default async (req, res) => {
  const { id, tagIds } = req.body;

  const tags = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      tags: {
        set: [],
        connect: tags,
      },
    },
    include: {
      tags: true,
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

import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";

const club = async (req, res) => {
  let { club_id, slug, tag_ids, cache } = req.query;

  if (club_id !== undefined) {
    const response = await prisma.club.findUnique({
      where: {
        id: club_id,
      },
      include: {
        tags: true,
        president: true,
      },
    });

    res.status(200).json({ ...response });
  }

  if (slug !== undefined) {
    const response = await prisma.club.findUnique({
      where: {
        slug: slug,
      },
      include: {
        tags: true,
        president: true,
      },
    });

    res.status(200).json({ ...response });
  }

  if (tag_ids !== undefined) {
    const query = Array.from([...tag_ids.split(",")], (tag_id) => {
      return {
        tags: {
          some: {
            id: {
              equals: tag_id,
            },
          },
        },
      };
    });

    const response = await prisma.club.findMany({
      where: {
        OR: query,
      },
      include: {
        tags: true,
        president: true,
      },
    });

    res.status(200).json([...response]);
  }

  if (cache !== undefined) {
    await redis.connect();

    const response = await redis.get("clubs");

    await redis.quit();

    const data = JSON.parse(response);

    res.status(200).json([...data]);
  }

  if (
    club_id === undefined &&
    slug === undefined &&
    tag_ids === undefined &&
    cache === undefined
  ) {
    const response = await prisma.club.findMany({
      include: {
        tags: true,
        president: true,
      },
    });

    res.status(200).json([...response]);
  }
};

export default club;

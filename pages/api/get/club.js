import { prisma } from "../../../config/prisma";

const club = async (req, res) => {
  const { club_id, slug, tag_id } = req.query;

  if (club_id !== undefined) {
    const response = await prisma.club.findUnique({
      where: {
        id: club_id,
      },
      include: {
        tags: true,
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
      },
    });

    res.status(200).json({ ...response });
  }

  if (tag_id !== undefined) {
    const response = await prisma.tag.findUnique({
      where: {
        id: tag_id,
      },
      include: {
        clubs: {
          include: {
            tags: true,
          },
        },
      },
    });

    res.status(200).json([...response.clubs]);
  }

  const response = await prisma.club.findMany({
    include: {
      tags: true,
    },
  });

  res.status(200).json([...response]);
};

export default club;

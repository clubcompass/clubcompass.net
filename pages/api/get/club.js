import { prisma } from "../../../config/prisma";

const club = async (req, res) => {
  const { club_id, slug, tag_ids } = req.query;

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

  if (tag_ids !== undefined) {
    const { meeting_code, tag_ids } = req.query;

    const tags = Array.from([...tag_ids.split(", ")], (tag_id) => {
      return {
        id: {
          equals: tag_id,
        },
      };
    });

    const unformatted_response = await prisma.tag.findMany({
      where: {
        OR: tags,
      },
      select: {
        clubs: {
          include: {
            tags: true,
          },
        },
      },
    });

    let clubs = [];

    unformatted_response.map((collection) => {
      collection.clubs.map((club) => {
        clubs.push(club);
      });
    });

    clubs = clubs.filter(
      (value, index, self) =>
        index === self.findIndex((club) => club.id === value.id)
    );

    res.status(200).json([...clubs]);
  }

  const response = await prisma.club.findMany({
    include: {
      tags: true,
    },
  });

  res.status(200).json([...response]);
};

export default club;

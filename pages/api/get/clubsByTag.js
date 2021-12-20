import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const clubsByTag = async (req, res) => {
  const { tag_id } = req.body;

  let { clubs } = await prisma.tag.findUnique({
    where: {
      id: tag_id,
    },
    include: {
      clubs: {
        select: {
          club: {
            include: {
              tags: {
                select: {
                  tag: true,
                },
              },
              president: true,
            },
          },
        },
      },
    },
  });

  clubs = clubs.filter((club) => {
    return club.club !== null;
  });

  res.status(200).json([...clubs]);
};

export default clubsByTag;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getByTag = async (req, res) => {
  const id = req.body.id;

  let resp = await prisma.tag.findUnique({
    where: {
      id: id,
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
            },
          },
        },
      },
    },
  });

  let clubs = resp.clubs;
  let clean_clubs = [];

  clubs.map((club) => {
    if (club.club !== null) {
      clean_clubs.push(club);
    }
  });

  res.status(200).json({ response: clean_clubs });
};

export default getByTag;

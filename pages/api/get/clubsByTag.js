import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getByTag = async (req, res) => {
  const { id } = req.body;

  const { clubs } = await prisma.tag.findUnique({
    where: {
      id,
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

  let clean_clubs = [];

  clubs.map((club) => {
    if (club.club !== null) {
      clean_clubs.push(club);
    }
  });

  //   clubs.map(({ club: { club } }) => {
  //     return club.filter((club) => {
  //       return club !== null;
  //     });
  //   });

  res.status(200).json({ response: clean_clubs });
};

export default getByTag;

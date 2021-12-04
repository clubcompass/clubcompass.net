import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createClub = async (req, res) => {
  let club = req.body;

  let tags = [];

  club.tags.map((tag) => {
    tags.push({ name: tag });
  });

  let resp = await prisma.club.create({
    data: {
      name: club.name,
      description: club.description,
      president: club.president,
      meeting_time: club.meeting_time,
      tags: {
        connect: tags,
      },
    },
    include: {
      tags: true,
    },
  });

  res.status(200).json({ response: resp });
};

export default createClub;

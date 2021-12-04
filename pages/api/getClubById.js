import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getClubById = async (req, res) => {
  const club_id = req.body.club;

  let resp = await prisma.club.findMany({
    where: {
      id: {
        equals: club_id,
      },
    },
    include: {
      tags: true,
      user: true,
    },
  });
  res.status(200).json({ response: resp });
};

export default getClubById;

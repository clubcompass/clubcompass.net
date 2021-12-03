import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getClubByName = async (req, res) => {
  const club_name = req.query.club;

  let resp = await prisma.club.findMany({
    where: {
      name: {
        equals: club_name,
      },
    },
    include: {
      tags: true,
    },
  });
  res.status(200).json({ response: resp });
};

export default getClubByName;

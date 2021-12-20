import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const club = async (req, res) => {
  const { club_id } = req.body;

  const response = await prisma.club.findUnique({
    where: {
      id: club_id,
    },
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
      president: true,
      members: {
        select: {
          user: true,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default club;

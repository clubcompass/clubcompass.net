import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const club = async (req, res) => {
  const { id } = req.body;

  const response = await prisma.club.findUnique({
    where: {
      id: id,
    },
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
    include: {
      president: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
        },
      },
    },
    include: {
      users: {
        select: {
          user: true,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default club;

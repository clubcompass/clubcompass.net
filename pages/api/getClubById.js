import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getClubById = async (req, res) => {
  const id = req.body.id;

  let resp = await prisma.club.findUnique({
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

  res.status(200).json({ response: resp });
};

export default getClubById;

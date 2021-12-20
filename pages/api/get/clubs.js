import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const clubs = async (req, res) => {
  let response = await prisma.club.findMany({
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
      president: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
        },
      },
      members: {
        select: {
          user: true,
        },
      },
    },
  });

  response.map((club) => {
    club.members = club.members.filter((member) => {
      return member !== null;
    });
  });

  res.status(200).json([...response]);
};

export default clubs;

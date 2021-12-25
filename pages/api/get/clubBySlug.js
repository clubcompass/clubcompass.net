import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const clubBySlug = async (req, res) => {
  const { club_slug } = req.body;

  const response = await prisma.club.findUnique({
    where: {
      slug: club_slug,
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

export default clubBySlug;

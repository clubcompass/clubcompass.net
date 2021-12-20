import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const link = async (req, res) => {
  const { club_id, link } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      link: link,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default link;

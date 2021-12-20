import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const link_name = async (req, res) => {
  const { club_id, link_name } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      link_name: link_name,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default link_name;

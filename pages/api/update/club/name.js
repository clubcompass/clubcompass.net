import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const name = async (req, res) => {
  const { club_id, name } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      name: name,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default name;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const description = async (req, res) => {
  const { club_id, description } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      description: description,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default description;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const teacher = async (req, res) => {
  const { club_id, teacher } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      teacher: teacher,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default teacher;

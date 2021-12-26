import { prisma } from "../../../../config/prisma";

const teacher = async (req, res) => {
  const { club_id, teacher } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      teacher: teacher,
    },
  });

  res.status(200).json({ ...response });
};

export default teacher;

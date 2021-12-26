import { prisma } from "../../../../config/prisma";

const president = async (req, res) => {
  const { club_id, user_id } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      president: {
        connect: {
          id: user_id,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default president;

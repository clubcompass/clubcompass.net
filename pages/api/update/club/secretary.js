import { prisma } from "../../../../config/prisma";

const secretary = async (req, res) => {
  const { club_id, user_id } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      secretary: {
        connect: {
          id: user_id,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default secretary;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const president = async (req, res) => {
  const { club_id, user_id } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      presidentOf: {
        connect: {
          id: club_id,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default president;

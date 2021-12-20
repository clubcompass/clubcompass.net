import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const user = async (req, res) => {
  const { user_id } = req.body;

  const response = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      clubs: {
        select: {
          club: true,
        },
      },
    },
  });
  res.status(200).json({ ...response });
};

export default user;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const email = async (req, res) => {
  const { user_id, email } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      email: email,
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

export default email;

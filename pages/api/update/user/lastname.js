import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const lastname = async (req, res) => {
  const { user_id, lastname } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      lastname: lastname,
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

export default lastname;

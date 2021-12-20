import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { user_id, club_id } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      clubs: {
        create: {
          club: {
            connect: {
              id: club_id,
            },
          },
        },
      },
    },
    include: {
      clubs: true,
    },
  });

  res.status(200).json({ ...response });
};

export default signup;

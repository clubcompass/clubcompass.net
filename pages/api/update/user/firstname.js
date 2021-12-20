import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const firstname = async (req, res) => {
  const { user_id, firstname } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      firstname: firstname,
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

export default firstname;

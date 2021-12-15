import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const user_id = req.body.id;

  let resp = await prisma.user.findUnique({
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
  res.status(200).json({ response: resp });
};

export default getUser;

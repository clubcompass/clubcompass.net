import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const makePresident = async (req, res) => {
  const { club_id, user_id } = req.body;

  const resp = await prisma.user.update({
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

  res.status(200).json({ response: resp });
};

export default makePresident;

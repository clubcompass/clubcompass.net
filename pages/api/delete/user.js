import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const user = async (req, res) => {
  const { user_id, connection_id } = req.body;

  let response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      clubs: {
        disconnect: {
          id: connection_id,
        },
      },
    },
    include: {
      clubs: true,
    },
  });

  res.status(200).json({ response });
};

export default user;

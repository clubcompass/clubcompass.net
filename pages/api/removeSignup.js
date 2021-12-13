import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { userID, connectionID } = req.body;

  let resp = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      clubs: {
        disconnect: {
          id: connectionID,
        },
      },
    },
    include: {
      clubs: true,
    },
  });

  res.status(200).json({ response: resp });
};

export default signup;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { userID, clubID } = req.body;

  let resp = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      clubs: {
        create: {
          club: {
            connect: {
              id: clubID,
            },
          },
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

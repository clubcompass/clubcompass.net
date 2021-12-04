import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const removeSignup = async (req, res) => {
  const { userID, clubID } = req.body;

  let resp = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      clubs: {
        disconnect: { id: clubID },
      },
    },
    include: {
      clubs: true,
    },
  });

  res.status(200).json({ response: resp });
};

export default removeSignup;

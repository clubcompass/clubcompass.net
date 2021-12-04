import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUserInfo = async (req, res) => {
  const user_id = req.body.user;

  let resp = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      club: true,
    },
  });
  res.status(200).json({ response: resp });
};

export default getUserInfo;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const email = async (req, res) => {
  const { club_id, email } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      email: email,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default email;

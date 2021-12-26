import { prisma } from "../../../../config/prisma";

const email = async (req, res) => {
  const { club_id, email } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      email: email,
    },
  });

  res.status(200).json({ ...response });
};

export default email;

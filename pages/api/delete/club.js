import { prisma } from "../../../config/prisma";

const user = async (req, res) => {
  const { club_id } = req.body;

  let response = await prisma.club.delete({
    where: {
      id: club_id,
    },
  });

  res.status(200).json({ response });
};

export default user;
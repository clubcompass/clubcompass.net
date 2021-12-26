import { prisma } from "../../../../config/prisma";

const name = async (req, res) => {
  const { club_id, name } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      name: name,
    },
  });

  res.status(200).json({ ...response });
};

export default name;

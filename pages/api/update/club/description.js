import { prisma } from "../../../../config/prisma";

const description = async (req, res) => {
  const { club_id, description } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      description: description,
    },
  });

  res.status(200).json({ ...response });
};

export default description;

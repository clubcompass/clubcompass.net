import { prisma } from "../../../../config/prisma";

const link = async (req, res) => {
  const { club_id, link } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      link: link,
    },
  });

  res.status(200).json({ ...response });
};

export default link;

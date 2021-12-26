import { prisma } from "../../../../config/prisma";

const image_link = async (req, res) => {
  const { club_id, image_link } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      image_link: image_link,
    },
  });

  res.status(200).json({ ...response });
};

export default image_link;

import { prisma } from "../../../../config/prisma";

const image_caption = async (req, res) => {
  const { club_id, image_caption } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      image_caption: image_caption,
    },
  });

  res.status(200).json({ ...response });
};

export default image_caption;

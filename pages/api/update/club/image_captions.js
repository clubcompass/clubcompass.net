import { prisma } from "../../../../config/prisma";

const image_captions = async (req, res) => {
  const { club_id, image_captions } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      image_captions: image_captions,
    },
  });

  res.status(200).json({ ...response });
};

export default image_captions;

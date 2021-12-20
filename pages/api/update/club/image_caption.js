import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const image_caption = async (req, res) => {
  const { club_id, image_caption } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      image_caption: image_caption,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default image_caption;

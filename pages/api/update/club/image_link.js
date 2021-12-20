import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const image_link = async (req, res) => {
  const { club_id, image_link } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      image_link: image_link,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default image_link;

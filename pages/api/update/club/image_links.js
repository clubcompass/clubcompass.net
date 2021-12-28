import { prisma } from "../../../../config/prisma";

const image_link = async (req, res) => {
  const { club_id, image_links } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      image_links: image_links,
    },
  });

  res.status(200).json({ ...response });
};

export default image_links;

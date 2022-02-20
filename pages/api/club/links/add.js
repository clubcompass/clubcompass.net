import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, name, link, type } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      links: {
        create: {
          name: name,
          link: link,
          type: type,
        },
      },
    },
    include: {
      links: true,
    },
  });

  return res.status(200).json({ ...response });
};

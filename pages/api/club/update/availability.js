import { prisma } from "../../../../config/prisma";
import { cacheBySlug } from "../../../utils/cache/cacheBySlug";

export default async (req, res) => {
  const { id, availability } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      availability: availability,
    },
    include: {
      links: true,
      tags: true,
      members: {
        include: {
          roles: true,
        },
      },
    },
  });

  await cacheBySlug(response);

  return res.status(200).json({ ...response });
};

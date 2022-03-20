import { prisma } from "../../../../config/prisma";
import { cacheBySlug } from "../../../../utils/cache/cacheBySlug";

export default async (req, res) => {
  const { id, location } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      location: location,
    },
  });

  await cacheBySlug(id);

  return res.status(200).json({ ...response });
};

import { prisma } from "../../../config/prisma";
import { updateClubCache } from "../../../utils/cache/updateClubCache";
import { cacheBySlug } from "../../../utils/cache/cacheBySlug";

export default async (req, res) => {
  const { id } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      approval: "APPROVED",
      status: "APPROVED",
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

  await updateClubCache();

  await cacheBySlug(response);

  return res.status(200).json({ ...response });
};

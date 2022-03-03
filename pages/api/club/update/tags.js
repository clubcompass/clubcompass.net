import { prisma } from "../../../../config/prisma";
import { cacheBySlug } from "../../../../utils/cache/cacheBySlug";
import { updateClubCache } from "../../../../utils/cache/updateClubCache";

export default async (req, res) => {
  const { id, tagIds } = req.body;

  const tags = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      tags: {
        set: [],
        connect: tags,
      },
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

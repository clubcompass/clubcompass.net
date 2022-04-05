import { prisma } from "../../../config/prisma";
import { updateClubCache } from "../../../utils/cache/updateClubCache";
import { cacheSlugById } from "../../../utils/cache/cacheSlugById";

export default async (req, res) => {
  const { userId, clubId } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      roles: true,
    },
  });

  const roles = Array.from([...user.roles], (role) => {
    if (role.clubId !== clubId) {
      return {
        id: role.id,
      };
    }
  });

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      clubs: {
        disconnect: {
          id: clubId,
        },
      },
      roles: {
        set: [],
        connect: roles,
      },
      canEdit: {
        disconnect: {
          id: clubId,
        },
      },
    },
    include: {
      clubs: true,
      roles: true,
    },
  });

  await updateClubCache();

  await cacheSlugById(clubId);

  return res.status(200).json({ ...response });
};

import { prisma } from "../../../config/prisma";
import { updateClubCache } from "../../../utils/cache/updateClubCache";

export default async (req, res) => {
  const { userId, clubId } = req.body;

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      clubs: {
        connect: {
          id: clubId,
        },
      },
    },
    include: {
      clubs: true,
    },
  });

  await updateClubCache();

  return res.status(200).json({ ...response });
};

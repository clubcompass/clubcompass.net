import { prisma } from "../../../../config/prisma";
import { cacheBySlug } from "../../../../utils/cache/cacheBySlug";

export default async (req, res) => {
  const { id, meetingDate } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      meetingDate: meetingDate,
    },
  });

  await cacheBySlug(id);

  return res.status(200).json({ ...response });
};

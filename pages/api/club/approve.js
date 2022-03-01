import { prisma } from "../../../config/prisma";
import { updateCache } from "../../../utils/cache/updateClubCache";

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
  });

  await updateCache();

  return res.status(200).json({ ...response });
};

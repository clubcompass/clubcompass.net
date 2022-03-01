import { prisma } from "../../../../config/prisma";
import { updateClubCache } from "../../../utils/cache/updateClubCache";

export default async (req, res) => {
  const { id, description } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      description: description,
    },
  });

  await updateClubCache();

  return res.status(200).json({ ...response });
};

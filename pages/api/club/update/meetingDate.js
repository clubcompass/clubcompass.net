import { prisma } from "../../../../config/prisma";

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

  return res.status(200).json({ ...response });
};

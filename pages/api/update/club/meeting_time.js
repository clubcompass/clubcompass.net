import { prisma } from "../../../../config/prisma";

const meeting_time = async (req, res) => {
  const { club_id, meeting_time } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      meeting_time: meeting_time,
    },
  });

  res.status(200).json({ ...response });
};

export default meeting_time;

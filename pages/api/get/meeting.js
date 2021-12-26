import { prisma } from "../../../config/prisma";

const meeting = async (req, res) => {
  const { meeting_code } = req.query;

  const response = await prisma.meeting.findUnique({
    where: {
      code: meeting_code,
    },
    include: {
      attendance: true,
    },
  });

  res.status(200).json({ ...response });
};

export default meeting;

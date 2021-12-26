import { prisma } from "../../../config/prisma";

const meeting_join = async (req, res) => {
  const { user_id, meeting_code } = req.body;

  const meeting_info = await prisma.meeting.findUnique({
    where: {
      code: meeting_code,
    },
  });

  if (meeting_info.status === "closed") {
    res.status(403).json({
      message: "Attempting to join a closed meeting",
    });
  }

  const response = await prisma.meeting.update({
    where: {
      code: meeting_code,
    },
    data: {
      attendance: {
        connect: {
          id: user_id,
        },
      },
    },
    include: {
      attendance: true,
    },
  });

  res.status(200).json({ ...response });
};

export default meeting_join;

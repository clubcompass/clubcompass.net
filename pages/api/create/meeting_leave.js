import { prisma } from "../../../config/prisma";

const meeting_leave = async (req, res) => {
  const { user_id, meeting_code } = req.body;

  const response = await prisma.meeting.update({
    where: {
      code: meeting_code,
    },
    data: {
      attendance: {
        disconnect: {
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

export default meeting_leave;

import { prisma } from "../../../../config/prisma";

const meeting_location = async (req, res) => {
  const { club_id, meeting_location } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      meeting_location: meeting_location,
    },
  });

  res.status(200).json({ ...response });
};

export default meeting_location;

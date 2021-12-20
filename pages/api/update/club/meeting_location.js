import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const meeting_location = async (req, res) => {
  const { club_id, meeting_location } = req.body;

  const response = await prisma.club.update({
    where: {
      id: club_id,
    },
    data: {
      meeting_location: meeting_location,
    },
    include: {
      president: true,
      members: true,
    },
  });

  res.status(200).json({ ...response });
};

export default meeting_location;

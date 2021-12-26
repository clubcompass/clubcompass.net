import { prisma } from "../../../config/prisma";

const meeting = async (req, res) => {
  const { club_id, location, purpose } = req.body;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 8; i > 0; --i) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  const response = await prisma.meeting.create({
    data: {
      location: location,
      purpose: purpose,
      code: code,
      club: {
        connect: {
          id: club_id,
        },
      },
    },
  });

  res.status(200).json({ ...response });
};

export default meeting;

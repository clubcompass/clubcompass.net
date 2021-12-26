import { prisma } from "../../../config/prisma";

const signup = async (req, res) => {
  const { user_id, club_id } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      clubs: {
        connect: {
          id: club_id,
        },
      },
    },
    include: {
      clubs: true,
    },
  });

  res.status(200).json({ ...response });
};

export default signup;

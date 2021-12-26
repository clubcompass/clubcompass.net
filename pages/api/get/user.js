import { prisma } from "../../../config/prisma";

const user = async (req, res) => {
  const { user_id } = req.query;

  const response = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      clubs: {
        include: {
          tags: true,
        },
      },
      presidentOf: true,
      vicePresidentOf: true,
      secretaryOf: true,
      treasurerOf: true,
      meetings: true,
    },
  });
  res.status(200).json({ ...response });
};

export default user;

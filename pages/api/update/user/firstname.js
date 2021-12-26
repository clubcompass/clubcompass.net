import { prisma } from "../../../../config/prisma";

const firstname = async (req, res) => {
  const { user_id, firstname } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      firstname: firstname,
    },
  });

  res.status(200).json({ ...response });
};

export default firstname;

import { prisma } from "../../../../config/prisma";

const email = async (req, res) => {
  const { user_id, email } = req.body;

  const response = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      email: email,
    },
  });

  res.status(200).json({ ...response });
};

export default email;

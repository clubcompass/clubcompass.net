import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, email } = req.body;

  const response = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
    },
  });

  return res.status(200).json({ ...response });
};

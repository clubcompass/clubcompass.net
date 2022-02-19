import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, password } = req.body;

  const response = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: password,
    },
  });

  return res.status(200).json({ ...response });
};

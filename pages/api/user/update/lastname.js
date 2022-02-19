import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, lastname } = req.body;

  const response = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      lastname: lastname,
    },
  });

  return res.status(200).json({ ...response });
};

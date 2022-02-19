import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { id, firstname } = req.body;

  const response = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      firstname: firstname,
    },
  });

  return res.status(200).json({ ...response });
};

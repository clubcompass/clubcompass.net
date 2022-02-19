import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      approval: "APPROVED",
      status: "APPROVED",
    },
  });

  return res.status(200).json({ ...response });
};

import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id } = req.body;

  const response = await prisma.invite.update({
    where: {
      id: id,
    },
    data: {
      status: "DECLINED",
    },
  });

  return res.status(200).json({ ...response });
};

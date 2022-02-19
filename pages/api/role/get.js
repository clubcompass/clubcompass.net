import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id, clubId } = req.query;

  if (id !== undefined) {
    const response = await prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        users: true,
        club: true,
      },
    });

    return res.status(200).json({ ...response });
  }

  if (clubId !== undefined) {
    const response = await prisma.role.findMany({
      where: {
        clubId: clubId,
      },
    });

    return res.status(200).json([...response]);
  }
};

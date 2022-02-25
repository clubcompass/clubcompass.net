import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { id, name, color, description, type } = req.body;

  const response = await prisma.club.update({
    where: {
      id: id,
    },
    data: {
      roles: {
        create: {
          name: name,
          color: color,
          description: description,
          type: type,
        },
      },
    },
    include: {
      roles: true,
    },
  });

  return res.status(200).json({ ...response });
};

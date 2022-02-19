import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { userId, roleIds } = req.body;

  const roles = Array.from([...roleIds], (roleId) => {
    return {
      id: roleId,
    };
  });

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      roles: {
        connect: roles,
      },
    },
    include: {
      roles: true,
    },
  });

  return res.status(200).json({ ...response });
};

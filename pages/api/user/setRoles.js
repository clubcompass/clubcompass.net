import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { userId, roleIds } = req.body;

  if (roleIds === undefined) {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roles: {
          set: [],
        },
      },
    });

    return res.status(200).json({ ...response });
  }

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
        set: [],
        connect: roles,
      },
    },
  });

  return res.status(200).json({ ...response });
};

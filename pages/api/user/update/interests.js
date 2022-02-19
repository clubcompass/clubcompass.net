import { prisma } from "../../../../config/prisma";

export default async (req, res) => {
  const { userId, tagIds } = req.body;

  const interests = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      interests: {
        set: [],
        connect: interests,
      },
    },
    include: {
      interests: true,
    },
  });

  return res.status(200).json({ ...response });
};

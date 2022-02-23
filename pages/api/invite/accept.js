import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { inviteId, clubId, userId } = req.body;

  const response = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: {
      invites: {
        update: {
          where: {
            id: inviteId,
          },
          data: {
            status: "ACCEPTED",
          },
        },
      },
      members: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      members: true,
      invites: {
        include: {
          user: true,
        },
      },
    },
  });

  return res.status(200).json({ ...response });
};

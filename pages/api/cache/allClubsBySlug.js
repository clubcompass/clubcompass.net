import { redis } from "../../../config/redis";
import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const clubs = await prisma.club.findMany({
    include: {
      links: true,
      tags: true,
      members: {
        include: {
          roles: true,
        },
      },
    },
  });

  clubs.map((club) => {
    const clubId = club.id;

    club.members.map((member) => {
      member.roles = member.roles.filter((role) => role.clubId === clubId);
    });
  });

  await redis.connect();

  for (let i = 0; i < clubs.length; i++) {
    await redis.set(clubs[i].slug, JSON.stringify(clubs[i]));
  }

  const response = await redis.quit();

  return res.status(200).json({ response });
};

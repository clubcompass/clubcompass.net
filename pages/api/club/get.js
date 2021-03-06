import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";

export default async (req, res) => {
  console.log("running");
  const { source, slug, clubId, tagIds, status } = req.query;

  if (source === "DB") {
    if (status === "APPROVED") {
      const response = await prisma.club.findMany({
        where: {
          approval: "APPROVED",
          status: "APPROVED",
        },
        include: {
          tags: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
      });

      return res.status(200).json([...response]);
    }

    if (status === "UNAPPROVED") {
      const response = await prisma.club.findMany({
        where: {
          approval: "UNAPPROVED",
          status: "REVIEW",
        },
        include: {
          tags: true,
        },
      });

      return res.status(200).json([...response]);
    }

    if (tagIds !== undefined) {
      const query = Array.from([...tagIds.split(",")], (tagId) => {
        return {
          tags: {
            some: {
              id: {
                equals: tagId,
              },
            },
          },
        };
      });

      const response = await prisma.club.findMany({
        where: {
          OR: query,
          approval: "APPROVED",
        },
        include: {
          tags: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
      });

      res.status(200).json([...response]);
    }

    if (clubId !== undefined) {
      const response = await prisma.club.findUnique({
        where: {
          id: clubId,
        },
        include: {
          applicationInfo: {
            include: {
              teacher: true,
              projectedRevenue: true,
              projectedExpenses: true,
            },
          },
          links: true,
          tags: true,
          members: {
            include: {
              roles: {
                where: {
                  clubId: clubId,
                },
              },
            },
          },
          editors: true,
          roles: true,
          invites: {
            include: {
              user: true,
            },
          },
        },
      });

      return res.status(200).json({ ...response });
    }

    if (slug !== undefined) {
      console.log("hello");
      console.log(slug);

      const response = await prisma.club.findUnique({
        where: {
          slug: slug,
        },
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

      const clubId = response.id;

      response.members.map((member) => {
        member.roles = member.roles.filter((role) => role.clubId === clubId);
      });

      return res.status(200).json({ ...response });
    }

    const response = await prisma.club.findMany({
      include: {
        applicationInfo: {
          include: {
            teacher: true,
            projectedRevenue: true,
            projectedExpenses: true,
          },
          links: true,
          tags: true,
          members: {
            include: {
              roles: true,
            },
          },
          editors: true,
          roles: true,
          invites: {
            include: {
              user: true,
            },
          },
        },
      },
    });

    return res.status(200).json([...response]);
  }

  if (source === "CACHE") {
    if (status === "APPROVED") {
      await redis.connect();

      const response = await redis.get("approved_clubs");

      await redis.quit();

      const data = JSON.parse(response);

      return res.status(200).json([...data]);
    }
    if (slug !== undefined) {
      await redis.connect();

      const response = await redis.get(slug);

      await redis.quit();

      const data = JSON.parse(response);

      return res.status(200).json({ ...data });
    }
  }
};

import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";

export default async (req, res) => {
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
      const response = await prisma.club.findUnique({
        where: {
          slug: slug,
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
      });

      return res.status(200).json({ ...response });
    }
  }

  if (source === "CACHE") {
    await redis.connect();

    const response = await redis.get("clubs");

    await redis.quit();

    const data = JSON.parse(response);

    return res.status(200).json([...data]);
  }

  if (source === undefined) {
    const response = await prisma.club.findMany({
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
    });
    console.log("test");
    console.log(response);

    return res.status(200).json([...response]);
  }
};

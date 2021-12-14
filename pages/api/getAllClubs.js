import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getClubs = async (req, res) => {
  let resp = await prisma.club.findMany({
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
    include: {
      president: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
        },
      },
    },
    include: {
      members: {
        select: {
          user: true,
        },
      },
    },
  });

  let members = [];

  resp.map((club) => {
    club.members.map((member, i) => {
      if (member.user !== null) {
        members.push(member);
      }
    });
    club.members = members;
    members = [];
  });

  res.status(200).json({ response: resp });
};

export default getClubs;

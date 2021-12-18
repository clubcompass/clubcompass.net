import algoliasearch from "algoliasearch";
import { PrismaClient } from "@prisma/client";

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY
);
const prisma = new PrismaClient();

const uploadClubs = async (req, res) => {
  let clubs = await prisma.club.findMany({
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
  });

  let newClubs = [];

  clubs.map((club) => {
    newClubs.push({
      objectID: club.id,
      name: club.name,
      president_name: `${club.president.firstname} ${club.president.lastname}`,
      description: club.description,
    });
  });

  const index = client.initIndex("clubs");

  let algolia_res = await index.replaceAllObjects(newClubs);

  res.status(200).json({ response: algolia_res });
};

export default uploadClubs;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//takes array of tag names and pushes to database

const createTag = async (req, res) => {
  const tag_names = req.query.tags.split(", ");

  let tags = [];

  tag_names.map((tag) => {
    tags.push({
      name: tag,
    });
  });

  console.log(tags);

  let resp = await prisma.tag.createMany({
    data: tags,
  });

  res.status(200).json({ response: resp });
};

export default createTag;

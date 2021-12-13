import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createTag = async (req, res) => {
  const tag_names = req.body.tags;
  let tags = [];

  tag_names.map((tag) => {
    tags.push({
      name: tag,
    });
  });

  let resp = await prisma.tag.createMany({
    data: tags,
  });

  res.status(200).json({ response: resp });
};

export default createTag;

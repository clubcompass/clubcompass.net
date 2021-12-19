import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const tag = async (req, res) => {
  const { tags: tag_names } = req.body;

  const tags = Array.from([...tag_names], (tag) => {
    return {
      name: tag,
    };
  });

  const response = await prisma.tag.createMany({
    data: tags,
  });

  res.status(200).json({ ...response });
};

export default tag;

import { prisma } from "../../../config/prisma";

const tag = async (req, res) => {
  const { tag_names } = req.body;

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

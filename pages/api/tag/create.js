import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const { names } = req.body;

  const tags = Array.from([...names], (name) => {
    return {
      name: name,
    };
  });

  const response = await prisma.tag.createMany({
    data: tags,
    skipDuplicates: true,
  });

  return res.status(200).json({ ...response });
};

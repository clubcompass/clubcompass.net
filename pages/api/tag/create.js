import { prisma } from "../../../config/prisma";

const handler = async (req, res) => {
  const { names } = req.body;

  const tags = Array.from([...names], (name) => {
    return {
      name: name,
    };
  });

  //

  // const response = await prisma.tag.createMany({
  //   data: tags,
  //   skipDuplicates: true,
  // });

  tags.map(async (tag) => {
    await prisma.tag.create({
      data: tag,
    });
  });

  return res.status(200);
};

export default handler;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getByTag = async (req, res) => {
  const tag_name = req.body.tag;

  let resp = await prisma.tag.findMany({
    where: {
      name: {
        equals: tag_name,
      },
    },
    include: {
      club: true,
    },
  });
  res.status(200).json({ response: resp });
};

export default getByTag;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getTags = async (req, res) => {
  let resp = await prisma.tag.findMany();

  res.status(200).json({ response: resp });
};

export default getTags;

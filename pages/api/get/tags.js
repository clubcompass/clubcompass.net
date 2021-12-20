import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const tags = async (req, res) => {
  const response = await prisma.tag.findMany();

  res.status(200).json({ ...response });
};

export default tags;

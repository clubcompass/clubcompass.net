import { prisma } from "../../../config/prisma";

const tags = async (req, res) => {
  const response = await prisma.tag.findMany();

  res.status(200).json([...response]);
};

export default tags;

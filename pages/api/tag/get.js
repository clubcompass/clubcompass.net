import { prisma } from "../../../config/prisma";

export default async (req, res) => {
  const response = await prisma.tag.findMany();
  return res.status(200).json([...response]);
};

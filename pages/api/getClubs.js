import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getClubs = async (req, res) => {
  let resp = await prisma.club.findMany();

  res.status(200).json({ response: resp });
};

export default getClubs;

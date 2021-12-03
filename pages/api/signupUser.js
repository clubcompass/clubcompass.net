import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createTag = async (req, res) => {
  let resp = await prisma.user.update({
    where: {
      id: "ckwqx6h8u0007i5q3uxylrlhb", //userID
    },
    data: {
      clubs: {
        connect: { id: "ckwqpxn8o0019u3q3r8n3ylcu" }, //clubID
      },
    },
    include: {
      clubs: true,
    },
  });

  res.status(200).json({ response: resp });
};

export default createTag;

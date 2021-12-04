import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  let resp = await prisma.user.create({
    data: {
      firstname: "Abhinav",
      lastname: "Palacharla",
      email: "abhinav.palacharla@gmail.com",
    },
  });

  res.status(200).json({ response: resp });
};

export default createUser;

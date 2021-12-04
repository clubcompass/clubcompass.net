import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const user = req.body;

  let resp = await prisma.user.create({
    data: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  res.status(200).json({ response: resp });
};

export default createUser;

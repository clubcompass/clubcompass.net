import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const user = async (req, res) => {
  const { id, firstname, lastname, email } = req.body;

  const response = await prisma.user.create({
    data: {
      id,
      firstname,
      lastname,
      email,
    },
  });

  res.status(200).json({ ...response });
};

export default user;

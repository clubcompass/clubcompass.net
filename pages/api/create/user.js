import { prisma } from "../../../config/prisma";

const user = async (req, res) => {
  const { id, firstname, lastname, email, grade, interests } = req.body;

  const response = await prisma.user.create({
    data: {
      id,
      firstname,
      lastname,
      email,
      grade,
      interests,
    },
  });

  res.status(200).json({ ...response });
};

export default user;

import { prisma } from "../../../config/prisma";

const user = async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    email,
    grade,
    tag_ids,
    password,
    emailVerified,
  } = req.body;

  const interests = Array.from([...tag_ids], (tag_id) => {
    return {
      id: tag_id,
    };
  });

  const response = await prisma.user.create({
    data: {
      id,
      firstname,
      lastname,
      email,
      grade,
      password,
      emailVerified,
      interests: {
        connect: interests,
      },
    },
  });

  res.status(200).json({ ...response });
};

export default user;

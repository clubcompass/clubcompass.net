import { prisma } from "../../../config/prisma";

const user = async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    email,
    grade,
    type,
    password,
    emailVerified,
    tagIds,
  } = req.body;

  if (type === "TEACHER") {
    const response = await prisma.user.create({
      data: {
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        grade: "TEACHER",
        type: "TEACHER",
        emailVerified: emailVerified,
      },
    });

    return res.status(200).json({ ...response });
  }

  const interests = Array.from([...tagIds], (tagId) => {
    return {
      id: tagId,
    };
  });

  const response = await prisma.user.create({
    data: {
      id: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      grade: grade,
      password: password,
      emailVerified: emailVerified,
      interests: {
        connect: interests,
      },
    },
    include: {
      interests: true,
    },
  });

  res.status(200).json({ ...response });
};

export default user;

import { prisma } from "../../../config/prisma";
import * as bcrypt from "bcrypt";
import { validate } from "../../../utils/validation";
import { newUserSchema } from "../../../utils/validation/schemas";
const register = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    grade,
    interests: interestsInput,
  } = req.body;

  const interests = interestsInput.map((interest) => {
    return { id: interest.id };
  });

  const { valid, error } = await validate({
    schema: newUserSchema,
    data: req.body,
  });

  if (!valid) {
    return res.status(400).json({
      error,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        grade,
        interests: {
          connect: interests,
        },
        emailVerified: false,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  }
};

export default register;

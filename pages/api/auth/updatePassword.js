import { prisma } from "../../../config/prisma";
import * as bcrypt from "bcrypt";
const register = async (req, res) => {
  const { user_id, password } = req.body;

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (await bcrypt.compare(password, currentUser.password)) {
    return res.status(400).json({
      message: "Password matches current password",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "User password updated",
      data: user,
    });
  }
};

export default register;

import { prisma } from "../../../config/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { setCookie } from "../../../utils/setCookie";

const JWT_SECRET = process.env.JWT;

const login = async (req, res) => {
  const { email, password, remember } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log(user);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "No user associated with this email address.",
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({
      status: "error",
      message: "Invalid password!",
    });
  }

  if (remember) {
    const token = jwt.sign(
      { sub: user.id, user: { id: user.id, email: user.email } },
      JWT_SECRET,
      {
        issuer: "http://localhost:3000",
        expiresIn: "30d",
      }
    );

    setCookie(res, "refreshToken", token, {
      httpOnly: true,
      sameSite: "strict",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Logged in successfully!",
  });
};

export default login;

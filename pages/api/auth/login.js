import { prisma } from "../../../config/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { validate } from "../../../utils/validation";
import { loginSchema } from "../../../utils/validation/schemas";
import { setCookie } from "../../../utils/setCookie";

const JWT_SECRET = process.env.JWT;

const login = async (req, res) => {
  const { email, password, remember } = req.body;

  const { valid, error } = await validate({
    schema: loginSchema,
    data: req.body,
  });

  if (!valid) {
    return res.status(400).json({
      error,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Email or Password is incorrect.",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      status: "error",
      message: "Email or Password is incorrect.",
    });
  }

  const token = jwt.sign(
    { sub: user.id, user: { id: user.id, email: user.email } },
    JWT_SECRET,
    {
      issuer: process.env.NEXT_PUBLIC_URL,
      expiresIn: remember ? "30d" : "1d",
    }
  );

  setCookie(res, "refreshToken", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    user: { id: user.id, token: token },
    status: "success",
    message: "Logged in successfully!",
  });
};

export default login;

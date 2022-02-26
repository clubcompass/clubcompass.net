import * as jwt from "jsonwebtoken";
import { prisma } from "../../../config/prisma";

const JWT_SECRET = process.env.JWT;

const authorization = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res
      .status(403)
      .json({ status: "error", message: "Not authorized." });
  }
  try {
    const {
      user: { id },
    } = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        canEdit: true,
        roles: true,
        clubs: {
          include: {
            tags: true,
          },
        },
        invites: {
          include: {
            club: true,
          },
        },
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Authorized.",
      user,
    });
  } catch {
    return res
      .status(403)
      .json({ status: "error", message: "Not authorized." });
  }
};

export default authorization;

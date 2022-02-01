import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT;

const authorization = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res
      .status(403)
      .json({ status: "error", message: "Not authorized." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      status: "success",
      message: "Authorized.",
      data: { id: data.user.id, email: data.user.email },
    });
  } catch {
    return res
      .status(403)
      .json({ status: "error", message: "Not authorized." });
  }
};

export default authorization;

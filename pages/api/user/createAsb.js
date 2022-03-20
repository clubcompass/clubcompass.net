import { prisma } from "../../../config/prisma";

const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
let ccid = "";
for (let i = 6; i > 0; --i) {
  ccid += chars[Math.floor(Math.random() * chars.length)];
}

export default async function handler(req, res) {
  const response = await prisma.user.create({
    data: {
      ccid: ccid,
      firstname: "Andrew",
      lastname: "Hale",
      email: "andrew.z.hale1@gmail.com",
      password: "$2b$10$HihvZx6IXwiFCdveslht7O3AYaCH5esQ4Y7VjLTIbUyJjOyulNc8G",
      grade: "ASB",
      type: "ASB",
      emailVerified: true,
    },
  });

  return res.status(200).json({ ...response });
}

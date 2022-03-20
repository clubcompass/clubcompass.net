import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";

type TokenPayload = jwt.JwtPayload & {
  id: User["id"];
  email: User["email"];
  firstname: User["firstname"];
  lastname: User["lastname"];
};

const verify = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query as { token: string };
  console.log(token);

  jwt.verify(token, process.env.SECRET, (err: any, decoded: TokenPayload) => {
    if (err) return res.status(400).redirect(`/verification?valid=false`);
    return decoded;
  }); // might pose problem

  const user = jwt.decode(token) as TokenPayload;

  const { verificationToken } = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (verificationToken !== token)
    return res.status(400).redirect(`/dashboard?valid=false`);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  return res.status(200).redirect(`/dashboard?valid=true`);
};

export default verify;
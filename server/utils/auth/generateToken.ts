import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const generateToken = ({
  id,
  ccid,
  email,
  emailVerified,
  type,
  active,
  remember,
}: {
  id: User["id"];
  ccid: User["ccid"];
  email: User["email"];
  emailVerified: User["emailVerified"];
  active: User["active"];
  type: User["type"];
  remember?: boolean;
}): string =>
  jwt.sign(
    {
      id,
      ccid,
      email,
      emailVerified,
      active,
      type,
    },
    process.env.SECRET as string,
    { expiresIn: remember ? "7d" : "1d" } // purge after session if !remember
  );

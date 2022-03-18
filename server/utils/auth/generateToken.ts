import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const generateToken = ({
  id,
  ccid,
  email,
  remember,
}: {
  id: User["id"];
  ccid: User["ccid"];
  email: User["email"];
  remember?: boolean;
}): string =>
  jwt.sign(
    {
      id,
      ccid,
      email,
    },
    process.env.SECRET as string,
    { expiresIn: remember ? "30d" : "3d" } // purge after session if !remember
  );

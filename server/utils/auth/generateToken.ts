import * as jwt from "jsonwebtoken";

export const generateToken = ({
  id,
  ccid,
  email,
  remember,
}: {
  id: number;
  ccid: string;
  email: string;
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

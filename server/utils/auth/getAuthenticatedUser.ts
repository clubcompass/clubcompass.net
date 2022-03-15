import { AuthenticationError } from "apollo-server-micro";
import * as jwt from "jsonwebtoken";

export type TokenPayload = jwt.JwtPayload & {
  id: number;
  ccid: string;
  email: string;
};

export const getAuthenticatedUser = ({ auth }): TokenPayload | void => {
  if (!auth) throw new AuthenticationError("You are not logged in");

  const token = auth.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("No session token provided.");

  const user = jwt.verify(
    token,
    process.env.SECRET,
    (err: any, decoded: TokenPayload) => {
      if (err) throw new AuthenticationError("Invalid token!");
      return decoded;
    }
  );
  return user;
};

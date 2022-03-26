import { PrismaClient } from "@prisma/client";
import { serialize, CookieSerializeOptions } from "cookie";
import { prisma } from "../../config/prisma";
import { getAuthenticatedUser, TokenPayload } from "../utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
export type Context = {
  auth: TokenPayload; // string
  setCookie: ({ name, value, options }: SetCookieOptions) => void;
  prisma: PrismaClient;
};

type SetCookieOptions = {
  name: string;
  value: string;
  options?: CookieSerializeOptions;
};

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> => {
  const token = req.headers.authorization || null;

  const user = token
    ? (getAuthenticatedUser({ auth: token }) as TokenPayload)
    : null; // if no token/user is found, user is null

  const setCookie = ({ name, value, options }: SetCookieOptions): void => {
    res.setHeader("Set-Cookie", serialize(name, value, options));
  };

  return {
    auth: user,
    setCookie, // maybe shouldn't be in context?
    prisma,
  };
};

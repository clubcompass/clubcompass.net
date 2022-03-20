import { PrismaClient } from "@prisma/client";
import { serialize, CookieSerializeOptions } from "cookie";
import { prisma } from "../../config/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export type Context = {
  auth: string;
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
  const auth = req.headers.authorization || ""; // null?
  // console.log(auth);
  // authorize user here
  const setCookie = ({ name, value, options }: SetCookieOptions): void => {
    res.setHeader("Set-Cookie", serialize(name, value, options));
  };

  return {
    auth,
    setCookie, // maybe shouldn't be in context?
    prisma,
  };
};

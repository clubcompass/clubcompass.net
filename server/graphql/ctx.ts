import { PrismaClient } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { NextApiRequest, NextApiResponse } from "next";
export type Context = {
  auth: string;
  prisma: PrismaClient;
};

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> => {
  const auth = req.headers.authorization || "";

  return {
    auth,
    prisma,
  };
};

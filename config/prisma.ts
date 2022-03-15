import { PrismaClient } from "@prisma/client";

const prisma =
  (global.prisma as PrismaClient) || (new PrismaClient() as PrismaClient);

if (process.env.NODE_ENV === "development")
  global.prisma = prisma as PrismaClient;

// export default prisma;

export { prisma };

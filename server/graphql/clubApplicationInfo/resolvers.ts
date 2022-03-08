import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.findUnique(args);
    },
    findFirstClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.findFirst(args);
    },
    findManyClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.findMany(args);
    },
    findManyClubApplicationInfoCount: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.count(args);
    },
    aggregateClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.aggregate(args);
    },
  },
  Mutation: {
    createOneClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.create(args);
    },
    updateOneClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.update(args);
    },
    deleteOneClubApplicationInfo: async (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.delete(args);
    },
    upsertOneClubApplicationInfo: async (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.upsert(args);
    },
    deleteManyClubApplicationInfo: async (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.deleteMany(args);
    },
    updateManyClubApplicationInfo: (_parent, args, { prisma }) => {
      return prisma.clubApplicationInfo.updateMany(args);
    },
  },
};
export default resolvers;

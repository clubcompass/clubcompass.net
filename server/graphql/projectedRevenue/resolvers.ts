import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.findUnique(args);
    },
    findFirstProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.findFirst(args);
    },
    findManyProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.findMany(args);
    },
    findManyProjectedRevenueCount: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.count(args);
    },
    aggregateProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.aggregate(args);
    },
  },
  Mutation: {
    createOneProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.create(args);
    },
    updateOneProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.update(args);
    },
    deleteOneProjectedRevenue: async (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.delete(args);
    },
    upsertOneProjectedRevenue: async (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.upsert(args);
    },
    deleteManyProjectedRevenue: async (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.deleteMany(args);
    },
    updateManyProjectedRevenue: (_parent, args, { prisma }) => {
      return prisma.projectedRevenue.updateMany(args);
    },
  },
};
export default resolvers;

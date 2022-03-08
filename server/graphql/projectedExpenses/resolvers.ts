import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.findUnique(args);
    },
    findFirstProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.findFirst(args);
    },
    findManyProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.findMany(args);
    },
    findManyProjectedExpensesCount: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.count(args);
    },
    aggregateProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.aggregate(args);
    },
  },
  Mutation: {
    createOneProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.create(args);
    },
    updateOneProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.update(args);
    },
    deleteOneProjectedExpenses: async (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.delete(args);
    },
    upsertOneProjectedExpenses: async (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.upsert(args);
    },
    deleteManyProjectedExpenses: async (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.deleteMany(args);
    },
    updateManyProjectedExpenses: (_parent, args, { prisma }) => {
      return prisma.projectedExpenses.updateMany(args);
    },
  },
};
export default resolvers;

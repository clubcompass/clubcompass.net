import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueRole: (_parent, args, { prisma }) => {
      return prisma.role.findUnique(args);
    },
    findFirstRole: (_parent, args, { prisma }) => {
      return prisma.role.findFirst(args);
    },
    findManyRole: (_parent, args, { prisma }) => {
      return prisma.role.findMany(args);
    },
    findManyRoleCount: (_parent, args, { prisma }) => {
      return prisma.role.count(args);
    },
    aggregateRole: (_parent, args, { prisma }) => {
      return prisma.role.aggregate(args);
    },
  },
  Mutation: {
    createOneRole: (_parent, args, { prisma }) => {
      return prisma.role.create(args);
    },
    updateOneRole: (_parent, args, { prisma }) => {
      return prisma.role.update(args);
    },
    deleteOneRole: async (_parent, args, { prisma }) => {
      return prisma.role.delete(args);
    },
    upsertOneRole: async (_parent, args, { prisma }) => {
      return prisma.role.upsert(args);
    },
    deleteManyRole: async (_parent, args, { prisma }) => {
      return prisma.role.deleteMany(args);
    },
    updateManyRole: (_parent, args, { prisma }) => {
      return prisma.role.updateMany(args);
    },
  },
};
export default resolvers;

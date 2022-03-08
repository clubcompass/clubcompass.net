import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueTag: (_parent, args, { prisma }) => {
      return prisma.tag.findUnique(args);
    },
    findFirstTag: (_parent, args, { prisma }) => {
      return prisma.tag.findFirst(args);
    },
    findManyTag: (_parent, args, { prisma }) => {
      return prisma.tag.findMany(args);
    },
    findManyTagCount: (_parent, args, { prisma }) => {
      return prisma.tag.count(args);
    },
    aggregateTag: (_parent, args, { prisma }) => {
      return prisma.tag.aggregate(args);
    },
  },
  Mutation: {
    createOneTag: (_parent, args, { prisma }) => {
      return prisma.tag.create(args);
    },
    updateOneTag: (_parent, args, { prisma }) => {
      return prisma.tag.update(args);
    },
    deleteOneTag: async (_parent, args, { prisma }) => {
      return prisma.tag.delete(args);
    },
    upsertOneTag: async (_parent, args, { prisma }) => {
      return prisma.tag.upsert(args);
    },
    deleteManyTag: async (_parent, args, { prisma }) => {
      return prisma.tag.deleteMany(args);
    },
    updateManyTag: (_parent, args, { prisma }) => {
      return prisma.tag.updateMany(args);
    },
  },
};
export default resolvers;

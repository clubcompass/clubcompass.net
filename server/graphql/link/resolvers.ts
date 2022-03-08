import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueLink: (_parent, args, { prisma }) => {
      return prisma.link.findUnique(args);
    },
    findFirstLink: (_parent, args, { prisma }) => {
      return prisma.link.findFirst(args);
    },
    findManyLink: (_parent, args, { prisma }) => {
      return prisma.link.findMany(args);
    },
    findManyLinkCount: (_parent, args, { prisma }) => {
      return prisma.link.count(args);
    },
    aggregateLink: (_parent, args, { prisma }) => {
      return prisma.link.aggregate(args);
    },
  },
  Mutation: {
    createOneLink: (_parent, args, { prisma }) => {
      return prisma.link.create(args);
    },
    updateOneLink: (_parent, args, { prisma }) => {
      return prisma.link.update(args);
    },
    deleteOneLink: async (_parent, args, { prisma }) => {
      return prisma.link.delete(args);
    },
    upsertOneLink: async (_parent, args, { prisma }) => {
      return prisma.link.upsert(args);
    },
    deleteManyLink: async (_parent, args, { prisma }) => {
      return prisma.link.deleteMany(args);
    },
    updateManyLink: (_parent, args, { prisma }) => {
      return prisma.link.updateMany(args);
    },
  },
};
export default resolvers;

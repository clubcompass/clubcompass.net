import { Resolvers } from "../resolversTypes";

const resolvers: Resolvers = {
  Query: {
    findUniqueInvite: (_parent, args, { prisma }) => {
      return prisma.invite.findUnique(args);
    },
    findFirstInvite: (_parent, args, { prisma }) => {
      return prisma.invite.findFirst(args);
    },
    findManyInvite: (_parent, args, { prisma }) => {
      return prisma.invite.findMany(args);
    },
    findManyInviteCount: (_parent, args, { prisma }) => {
      return prisma.invite.count(args);
    },
    aggregateInvite: (_parent, args, { prisma }) => {
      return prisma.invite.aggregate(args);
    },
  },
  Mutation: {
    createOneInvite: (_parent, args, { prisma }) => {
      return prisma.invite.create(args);
    },
    updateOneInvite: (_parent, args, { prisma }) => {
      return prisma.invite.update(args);
    },
    deleteOneInvite: async (_parent, args, { prisma }) => {
      return prisma.invite.delete(args);
    },
    upsertOneInvite: async (_parent, args, { prisma }) => {
      return prisma.invite.upsert(args);
    },
    deleteManyInvite: async (_parent, args, { prisma }) => {
      return prisma.invite.deleteMany(args);
    },
    updateManyInvite: (_parent, args, { prisma }) => {
      return prisma.invite.updateMany(args);
    },
  },
};
export default resolvers;

import { Resolvers } from "../resolversTypes";
import { joinClub } from "./custom/joinClub";
import { leaveClub } from "./custom/leaveClub";
import { deleteClub } from "./custom/deleteClub";
import { updateClubTags } from "./custom/updateClubTags";
import { createClub } from "./custom/createClub";

const resolvers: Resolvers = {
  Query: {
    findUniqueClub: (_parent, args, { prisma }) => {
      return prisma.club.findUnique(args);
    },
    findFirstClub: (_parent, args, { prisma }) => {
      return prisma.club.findFirst(args);
    },
    findManyClub: (_parent, args, { prisma }) => {
      return prisma.club.findMany(args);
    },
    findManyClubCount: (_parent, args, { prisma }) => {
      return prisma.club.count(args);
    },
    aggregateClub: (_parent, args, { prisma }) => {
      return prisma.club.aggregate(args);
    },
  },
  Mutation: {
    createOneClub: (_parent, args, { prisma }) => {
      return prisma.club.create(args);
    },
    updateOneClub: (_parent, args, { prisma }) => {
      return prisma.club.update(args);
    },
    deleteOneClub: async (_parent, args, { prisma }) => {
      return prisma.club.delete(args);
    },
    upsertOneClub: async (_parent, args, { prisma }) => {
      return prisma.club.upsert(args);
    },
    deleteManyClub: async (_parent, args, { prisma }) => {
      return prisma.club.deleteMany(args);
    },
    updateManyClub: (_parent, args, { prisma }) => {
      return prisma.club.updateMany(args);
    },
    joinClub,
    leaveClub,
    deleteClub,
    updateClubTags,
    createClub,
  },
};
export default resolvers;

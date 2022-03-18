import { Resolvers } from "../types/resolversTypes";
import { getTags } from "./resolvers/getTags";
import { createTags } from "./resolvers/createTags";
const resolvers: Resolvers = {
  Query: {
    getTags,
  },
  Mutation: {
    createTags,
  },
};
export default resolvers;

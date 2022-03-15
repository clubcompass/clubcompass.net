import { Resolvers } from "../types/resolversTypes";
import { getTags } from "./resolvers/getTags";
const resolvers: Resolvers = {
  Query: {
    getTags,
  },
  // Mutation: {},
};
export default resolvers;

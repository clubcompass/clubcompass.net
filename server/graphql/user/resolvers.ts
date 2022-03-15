import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { getUserLeadershipClubs } from "./resolvers/getUserLeadershipClubs";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUserLeadershipClubs,
  },
  Mutation: {
    updateUserInterests,
  },
};
export default resolvers;

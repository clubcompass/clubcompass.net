import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { getUserLeadershipClubs } from "./resolvers/getUserLeadershipClubs";
import { validateUser } from "./resolvers/validateUser";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUserLeadershipClubs,
    validateUser,
  },
  Mutation: {
    updateUserInterests,
  },
};
export default resolvers;

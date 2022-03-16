import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { deleteUser } from "./resolvers/deleteUser";
import { getUserLeadershipClubs } from "./resolvers/getUserLeadershipClubs";
import { validateUser } from "./resolvers/validateUser";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUserLeadershipClubs,
    validateUser,
  },
  Mutation: {
    deleteUser,
    updateUserInterests,
  },
};
export default resolvers;

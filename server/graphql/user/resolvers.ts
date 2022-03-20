import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { deleteUser } from "./resolvers/deleteUser";
import { getUserLeadershipClubs } from "./resolvers/getUserLeadershipClubs";
import { validateUser } from "./resolvers/validateUser";
import { approveUser } from "./resolvers/approveUser";
import { getUsers } from "./resolvers/getUsers";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUserLeadershipClubs,
    validateUser,
    getUsers,
  },
  Mutation: {
    deleteUser,
    updateUserInterests,
    approveUser,
  },
};
export default resolvers;

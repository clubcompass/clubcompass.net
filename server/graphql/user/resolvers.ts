import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { deleteUser } from "./resolvers/deleteUser";
import { getUserLeadershipClubs } from "./resolvers/getUserLeadershipClubs";
import { validateUser } from "./resolvers/validateUser";
import { approveUser } from "./resolvers/approveUser";
import { getUsers } from "./resolvers/getUsers";
import { batchDeleteUsers } from "./resolvers/batchDeleteUsers";
import { batchApproveUsers } from "./resolvers/batchApproveUsers";
import { getUser } from "./resolvers/getUser";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUserLeadershipClubs,
    validateUser,
    getUsers,
    getUser,
  },
  Mutation: {
    deleteUser,
    updateUserInterests,
    approveUser,
    batchDeleteUsers,
    batchApproveUsers,
  },
};
export default resolvers;

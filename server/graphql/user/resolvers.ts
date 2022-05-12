import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { deleteUser } from "./resolvers/deleteUser";
import { approveUser } from "./resolvers/approveUser";
import { getUsers } from "./resolvers/getUsers";
import { batchDeleteUsers } from "./resolvers/batchDeleteUsers";
import { batchApproveUsers } from "./resolvers/batchApproveUsers";
import { getUser } from "./resolvers/getUser";
import { getUserDrafts } from "./resolvers/getUserDrafts";
import { getUserProfile } from "./resolvers/getUserProfile";
import { validateUser } from "./resolvers/validateUser";
import { updateUserRoles } from "./resolvers/updateUserRoles";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUsers,
    getUser,
    getUserDrafts,
    getUserProfile,
    validateUser,
  },
  Mutation: {
    deleteUser,
    updateUserInterests,
    approveUser,
    batchDeleteUsers,
    batchApproveUsers,
    updateUserRoles,
  },
};
export default resolvers;

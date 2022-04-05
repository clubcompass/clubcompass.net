import { Resolvers } from "../types/resolversTypes";
import { updateUserInterests } from "./resolvers/updateUserInterests";
import { getUserClubs } from "./resolvers/getUserClubs";
import { deleteUser } from "./resolvers/deleteUser";
import { getUserLeadershipClubs } from "./resolvers/getUserLeadershipClubs";
import { approveUser } from "./resolvers/approveUser";
import { getUsers } from "./resolvers/getUsers";
import { batchDeleteUsers } from "./resolvers/batchDeleteUsers";
import { batchApproveUsers } from "./resolvers/batchApproveUsers";
import { getUser } from "./resolvers/getUser";
import { getUserDrafts } from "./resolvers/getUserDrafts";
import { getAdvisorClubs } from "./resolvers/getAdvisorClubs";
import { getUserProfile } from "./resolvers/getUserProfile";
import { validateUser } from "./resolvers/validateUser";
import { updateUserRoles } from "./resolvers/updateUserRoles";

const resolvers: Resolvers = {
  Query: {
    getUserClubs,
    getUserLeadershipClubs,
    getUsers,
    getUser,
    getUserDrafts,
    getAdvisorClubs,
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

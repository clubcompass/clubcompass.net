import { Resolvers } from "../types/resolversTypes";
import { getUserInvites } from "./resolvers/getUserInvites";
import { acceptInvite } from "./resolvers/acceptInvite";
import { declineInvite } from "./resolvers/declineInvite";
import { issueInvite } from "./resolvers/issueInvite";
const resolvers: Resolvers = {
  Query: {
    getUserInvites,
  },
  Mutation: {
    issueInvite,
    acceptInvite,
    declineInvite,
  },
};
export default resolvers;

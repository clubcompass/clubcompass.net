import { Resolvers } from "../types/resolversTypes";
import { getUserInvites } from "./resolvers/getUserInvites";
import { acceptInvite } from "./resolvers/acceptInvite";
import { declineInvite } from "./resolvers/declineInvite";
import { issueInvite } from "./resolvers/issueInvite";
import { issueTeacherInvite } from "./resolvers/issueTeacherInvite";
import { acceptTeacherInvite } from "./resolvers/acceptTeacherInvite";
import { deleteIncomingInvite } from "./resolvers/deleteIncomingInvite";
import { deleteOutgoingInvite } from "./resolvers/deleteOutgoingInvite";

const resolvers: Resolvers = {
  Query: {
    getUserInvites,
  },
  Mutation: {
    issueInvite,
    acceptInvite,
    declineInvite,
    issueTeacherInvite,
    acceptTeacherInvite,
    deleteIncomingInvite,
    deleteOutgoingInvite,
  },
};
export default resolvers;

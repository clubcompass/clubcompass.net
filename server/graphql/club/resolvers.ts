import { Resolvers } from "../types/resolversTypes";
import { joinClub } from "./resolvers/joinClub";
import { leaveClub } from "./resolvers/leaveClub";
import { deleteClub } from "./resolvers/deleteClub";
import { createClub } from "./resolvers/createClub";
import { editClub } from "./resolvers/editClub";
import { getClub } from "./resolvers/getClub";
import { sendClubForApproval } from "./resolvers/sendClubForApproval";
import { approveClub } from "./resolvers/approveClub";
import { declineClub } from "./resolvers/declineClub";
import { getApprovedClubs } from "./resolvers/getApprovedClubs";
import { getUnapprovedClubs } from "./resolvers/getUnapprovedClubs";
import { requestToJoinClub } from "./resolvers/requestToJoinClub";
import { getClubInvites } from "./resolvers/getClubInvites";
import { getAdminApprovedClubs } from "./resolvers/getAdminApprovedClubs";
import { getClubLinks } from "./resolvers/getClubLinks";
import { getClubDraftSummary } from "./resolvers/getClubDraftSummary";

const resolvers: Resolvers = {
  Query: {
    getClub,
    getApprovedClubs,
    getAdminApprovedClubs,
    getUnapprovedClubs,
    getClubInvites,
    getClubLinks,
    getClubDraftSummary,
  },
  Mutation: {
    joinClub,
    leaveClub,
    deleteClub,
    createClub,
    editClub,
    sendClubForApproval,
    approveClub,
    declineClub,
    requestToJoinClub,
  },
};
export default resolvers;

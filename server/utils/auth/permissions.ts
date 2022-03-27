import { shield, rule, allow, and, or } from "graphql-shield";
import { AuthenticationError } from "apollo-server-micro";
import { Context } from "../../graphql/ctx";

const isASB = rule({ cache: "contextual" })(
  async (parent, args, { auth }, info) => {
    if (
      auth.type === "ASB" &&
      auth.active === true &&
      auth.emailVerified === true
    )
      return true;
    return new AuthenticationError("Unauthorized", {
      id: auth.id,
      type: auth.type,
      emailVerified: auth.emailVerified,
      active: auth.active,
    });
  }
);

const isStudent = rule({ cache: "contextual" })(
  async (parent, args, { auth }: Context, info) => {
    if (
      auth.type === "STUDENT" &&
      auth.active === true &&
      auth.emailVerified === true
    )
      return true;
    return new AuthenticationError("Unauthorized", {
      id: auth.id,
      type: auth.type,
      emailVerified: auth.emailVerified,
      active: auth.active,
    });
  }
);

export const permissions = shield(
  {
    Query: {
      getUserClubs: or(isStudent, isASB),
      getAdminApprovedClubs: isASB,
      getUnapprovedClubs: isASB,
      getUsers: isASB,
      getClubInvites: isStudent,
    },
    Mutation: {
      approveClub: isASB,
      declineClub: isASB,
      deleteClub: or(isASB, isStudent),
      createClub: isStudent,
      editClub: or(isStudent, isASB),
      joinClub: isStudent,
      leaveClub: isStudent,
      requestToJoinClub: isStudent,
      sendClubForApproval: isStudent,
      issueInvite: isStudent,
      acceptInvite: isStudent,
      declineInvite: isStudent,
      approveUser: isASB,
      batchApproveUsers: isASB,
      deleteUser: isASB,
      batchDeleteUsers: isASB,
      updateUserInterests: isStudent,
    },
  },
  { debug: true }
);

import { shield, rule, or } from "graphql-shield";
import { ApolloError, AuthenticationError } from "apollo-server-micro";
import { Context } from "../../graphql/ctx";

const isASB = rule({ cache: "contextual" })(
  async (parent, args, { auth, prisma }, info) => {
    const user = await prisma.user.findUnique({
      where: {
        id: auth.id,
      },
    });

    if (!user)
      throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
        id: auth.id,
      });

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
  async (parent, args, { auth, prisma }: Context, info) => {
    const user = await prisma.user.findUnique({
      where: {
        id: auth.id,
      },
    });

    if (!user)
      throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
        id: auth.id,
      });

    if (
      user.type === "STUDENT" &&
      user.active === true &&
      user.emailVerified === true
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

const isTeacher = rule({ cache: "contextual" })(
  async (parent, args, { auth, prisma }: Context, info) => {
    const user = await prisma.user.findUnique({
      where: {
        id: auth.id,
      },
    });

    if (!user)
      throw new ApolloError("User not found", "RESOURCE_NOT_FOUND", {
        id: auth.id,
      });

    if (
      auth.type === "TEACHER" &&
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
      getAdvisorClubs: isTeacher,
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

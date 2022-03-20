import gql from "graphql-tag";

export default gql`
  enum InviteStatus {
    PENDING
    DECLINED
    ACCEPTED
  }

  type Invite {
    id: ID!
    status: InviteStatus!
    club: Club!
    clubId: ID!
    user: User!
    userId: ID!
  }

  type UserInvites {
    pendingInvites: [Invite!]!
    acceptedInvites: [Invite!]!
    declinedInvites: [Invite!]!
  }

  type Query {
    getUserInvites: UserInvites!
  }

  type Mutation {
    issueInvite(clubId: ID!, recipientCCID: String!): Invite!
    acceptInvite(inviteId: ID!, clubId: ID!): Club!
    declineInvite(inviteId: ID!): Club!
  }
`;

import gql from "graphql-tag";

export default gql`
  type Invite {
    id: Int!
    status: String!
    club: Club!
    clubId: Int!
    user: User!
    userId: Int!
  }

  type UserInvites {
    pendingInvites: [Invite]
    acceptedInvites: [Invite]
    declinedInvites: [Invite]
  }

  type Query {
    getUserInvites: UserInvites!
  }

  type Mutation {
    issueInvite(clubId: Int!, recipientCCID: String!): Invite!
    acceptInvite(inviteId: Int!, clubId: Int!): User!
    declineInvite(inviteId: Int!): User!
  }
`;

import gql from "graphql-tag";

export default gql`
  ##### GET USER INVITES #####

  type GetUserInvitesPayload {
    pendingInvites: [Invite!]!
    acceptedInvites: [Invite!]!
    declinedInvites: [Invite!]!
  }

  ##### END OF GET USER INVITES #####

  ##### SHARED ####

  enum InviteStatus {
    PENDING
    DECLINED
    ACCEPTED
  }

  enum InviteType {
    OUTGOING
    INCOMING
  }

  input RoleInput {
    id: String!
  }

  type Invite {
    id: ID!
    status: InviteStatus!
    club: Club!
    clubId: ID!
    user: User!
    userId: ID!
    roles: [Role!]!
    type: InviteType!
  }

  ##### END OF SHARED #####

  ##### QUERIES + MUTATIONS #####

  type Query {
    getUserInvites: GetUserInvitesPayload!
  }

  type Mutation {
    issueInvite(
      clubId: ID!
      recipientCCID: String!
      inviteRoles: [RoleInput!]!
    ): Invite!
    acceptInvite(inviteId: ID!, clubId: ID!): User!
    declineInvite(inviteId: ID!): User!
  }

  ##### END OF QUERIES + MUTATIONS #####
`;

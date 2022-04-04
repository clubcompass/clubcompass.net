import gql from "graphql-tag";

export default gql`
  ##### GET USER INVITES #####

  type InvitePayload {
    id: ID!
    club: InviteClub!
    roles: [InviteRole!]!
    type: InviteType!
    status: InviteStatus!
    createdAt: DateTime!
  }

  type InviteClub {
    id: ID!
    name: String!
    slug: String!
    description: String!
    status: String!
  }

  type InviteRole {
    name: String!
  }

  type InvitePayloadType {
    pending: [InvitePayload!]!
    accepted: [InvitePayload!]!
    declined: [InvitePayload!]!
  }

  type GetUserInvitesPayload {
    incoming: InvitePayloadType!
    outgoing: InvitePayloadType!
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

  type UserId {
    id: ID!
  }

  type InviteId {
    id: ID!
  }

  type MutateInvitePayload {
    id: ID!
    clubName: String!
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
      inviteRoles: [RoleInput!]
    ): InviteId!
    acceptInvite(inviteId: ID!, clubId: ID!): MutateInvitePayload!
    declineInvite(inviteId: ID!): MutateInvitePayload!
    issueTeacherInvite(
      clubId: ID!
      recipientCCID: String!
    ): MutateInvitePayload!
    acceptTeacherInvite(inviteId: ID!, clubId: ID!): UserId!
    deleteIncomingInvite(inviteId: ID!): InviteId!
    deleteOutgoingInvite(inviteId: ID!): InviteId!
  }

  ##### END OF QUERIES + MUTATIONS #####
`;

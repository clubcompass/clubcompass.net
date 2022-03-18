import gql from "graphql-tag";

export default gql`
  type User {
    id: ID!
    ccid: String!
    firstname: String!
    lastname: String!
    email: String!
    emailVerified: Boolean!
    password: String!
    grade: Grade!
    type: UserType!
    interests: [Tag!]
    clubs: [Club!]
    canEdit: [Club!]
    advisor: [ClubApplicationInfo!]
    roles: [Role!]
    invites: [Invite!]
  }

  enum Grade {
    FRESHMAN
    sophomore
    SOPHOMORE
    JUNIOR
    SENIOR
    TEACHER
  }

  # enum UserType {
  #   STUDENT
  #   TEACHER
  #   ASB
  #   ADMIN
  # }

  input TagInput {
    id: ID!
  }

  type GetUserLeadershipClubsPayload {
    isPresidentOf: [Club!]
    hasLeadershipIn: [Club!]
    hasEditorIn: [Club!]
  }

  type Query {
    getUserClubs: [Club!]!
    getUserLeadershipClubs: GetUserLeadershipClubsPayload!
    validateUser(ccid: String!): User!
  }

  type Mutation {
    deleteUser(id: ID!): User!
    updateUserInterests(id: ID!, tags: [TagInput!]!): [Tag!]! # should return just interests
  }
`;

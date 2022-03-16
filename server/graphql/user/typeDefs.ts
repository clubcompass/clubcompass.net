import gql from "graphql-tag";

export default gql`
  type User {
    id: String!
    ccid: String!
    firstname: String!
    lastname: String!
    email: String!
    emailVerified: Boolean!
    password: String!
    grade: [UserGrade!]!
    type: [UserType!]!
    interests: [Tag!]
    clubs: [Club!]
    canEdit: [Club!]
    advisor: [ClubApplicationInfo!]
    roles: [Role!]
    invites: [Invite!]
  }

  enum UserGrade {
    FRESHMAN
    sophomore
    SOPHOMORE
    JUNIOR
    SENIOR
    TEACHER
  }

  enum UserType {
    STUDENT
    TEACHER
    ASB
    ADMIN
  }

  input TagInput {
    id: Int!
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
    deleteUser(id: Int!): User!
    updateUserInterests(id: Int!, tags: [TagInput!]!): [Tag!]! # should return just interests
  }
`;

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

  type GetUserLeadershipClubsPayload {
    isPresidentOf: [Club!]
    hasLeadershipIn: [Club!]
    hasEditorIn: [Club!]
  }

  type Query {
    getUserClubs: [Club!]!
    getUserLeadershipClubs: GetUserLeadershipClubsPayload!
  }

  type Mutation {
    updateUserInterests(id: Int!, tagIds: [Int!]!): [Tag!]! # should return just interests
  }
`;

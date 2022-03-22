import gql from "graphql-tag";

export default gql`
  ###### APPROVE USER #####

  type ApproveUserPayload {
    id: ID!
    firstname: String!
    lastname: String!
    active: Boolean!
  }

  ###### END OF APPROVE USER #####

  ##### GET USER CLUBS #####

  type GetUserClubPayload {
    id: ID!
    name: String!
    slug: String!
    description: String!
    tags: [ClubPageTag!]
    _count: ClubMembersCount!
  }

  ##### END OF GET USER CLUBS #####

  ##### GET USER LEADERSHIP CLUBS #####

  type GetUserLeadershipClubsPayload {
    isPresidentOf: [LeadershipClubs!]!
    hasLeadershipIn: [LeadershipClubs!]!
    hasEditorIn: [EditorClubs!]!
  }

  type LeadershipClubs {
    id: ID!
    name: String!
    slug: String!
    description: String!
    availability: ClubAvailability!
    tags: [ClubPageTag!]!
    _count: ClubMembersCount!
    roles: [LeadershipRoles!]!
  }

  type EditorClubs {
    id: ID!
    name: String!
    slug: String!
    description: String!
    availability: ClubAvailability!
    tags: [ClubPageTag!]!
    _count: ClubMembersCount!
  }

  type LeadershipRoles {
    name: String!
    type: RoleType!
  }

  ##### END OF GET USER LEADERSHIP CLUBS #####

  ##### GET USERS #####

  type GetUserPayload {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    studentId: String!
    grade: Grade!
    clubs: [UserClub!]!
  }

  type UserClub {
    id: ID!
    name: String!
    slug: String!
  }

  ##### END OF GET USERS #####

  type User {
    id: ID!
    ccid: String!
    firstname: String!
    lastname: String!
    email: String!
    emailVerified: Boolean!
    active: Boolean!
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

  enum UserType {
    STUDENT
    TEACHER
    ASB
    ADMIN
  }

  input TagInput {
    id: ID!
  }

  type Query {
    getUsers(type: String!): [GetUserPayload!]!
    getUserClubs: [GetUserClubPayload!]!
    getUserLeadershipClubs: GetUserLeadershipClubsPayload!
    validateUser(ccid: String!): User!
  }

  type Mutation {
    deleteUser(id: ID!): User!
    updateUserInterests(id: ID!, tags: [TagInput!]!): [Tag!]!
    approveUser(userId: ID!): ApproveUserPayload!
  }
`;

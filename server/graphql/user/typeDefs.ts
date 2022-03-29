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

  ##### DELETE USER #####

  input DeleteUserArgs {
    id: ID
    slug: String
    email: String
  }

  type DeleteUserPayload {
    id: ID!
    firstname: String!
    lastname: String!
  }

  ##### END OF DELETE USER #####

  ##### GET USERS #####

  type DeleteUserOptions {
    id: ID!
    name: String! # should be fullname?
    type: UserType!
  }

  type GetUsersPayload {
    id: ID!
    fullname: String!
    email: String!
    studentId: String!
    grade: Grade!
    delete: DeleteUserOptions!
  }

  ##### END OF GET USERS #####

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

  ##### BATCH DELETE USERS #####

  type BatchDeleteUserPayload {
    firstname: String!
    lastname: String!
    studentId: String!
  }

  ##### END OF BATCH DELETE USERS #####

  ##### BATCH APPROVE USERS #####

  type BatchApproveUserPayload {
    firstname: String!
    lastname: String!
    active: Boolean!
  }

  ##### END OF BATCH APPROVE USERS #####

  ##### GET USER #####

  input GetUserIdentifierArgs {
    id: ID
    ccid: String
    email: String
  }
  type GetUserPayload {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    type: UserType!
  }

  ##### END OF GET USER #####

  ##### VALIDATE STUDENT #####

  type ValidateStudentPayload {
    id: ID!
    firstname: String!
    lastname: String!
  }

  ##### END OF VALIDATE STUDENT #####

  ##### VALIDATE TEACHER #####

  type ValidateTeacherPayload {
    id: ID!
    firstname: String!
    lastname: String!
  }

  ##### END OF VALIDATE TEACHER #####

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
    studentId: String!
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
    getUsers(active: Boolean): [GetUsersPayload!]!
    getUserClubs: [GetUserClubPayload!]!
    getUserLeadershipClubs: GetUserLeadershipClubsPayload!
    validateStudent(ccid: String!): ValidateStudentPayload!
    validateTeacher(ccid: String!): ValidateTeacherPayload!
    getUser(identifier: GetUserIdentifierArgs!, type: UserType): GetUserPayload!
  }

  type Mutation {
    deleteUser(identifier: DeleteUserArgs!): DeleteUserPayload!
    updateUserInterests(id: ID!, tags: [TagInput!]!): [Tag!]!
    approveUser(userId: ID!): ApproveUserPayload!
    batchDeleteUsers(userIds: [ID!]!): [BatchDeleteUserPayload!]!
    batchApproveUsers(userIds: [ID!]!): [BatchApproveUserPayload!]!
  }
`;

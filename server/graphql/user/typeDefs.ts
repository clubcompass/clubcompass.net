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
    slug: String!
    name: String!
    roles: [RoleName!]!
    status: ClubStatus!
    location: String!
    meetingDate: String!
  }

  type RoleName {
    name: String!
  }

  # type leaderOfPayload {
  #   presidentOf: [UserClubPayload!]!
  #   editorOf: [UserClubPayload!]!
  #   cantEdit: [UserClubPayload!]!
  # }

  type GetUserClubsPayload {
    # leaderOf: leaderOfPayload!
    leaderOf: [UserClubPayload!]!
    memberOf: [UserClubPayload!]!
    drafts: [UserDraftPayload!]!
  }

  type TagName {
    name: String!
  }

  type UserClubPayload {
    id: ID!
    slug: String!
    name: String!
    meetingDate: String!
    location: String!
    status: ClubStatus!
    roles: [RoleName!]!
    president: Boolean!
    manage: Boolean!
  }

  type UserDraftPayload {
    id: ID!
    name: String!
    slug: String!
    status: DraftStatus!
    tasks: [DraftTask!]!
    completed: Int!
    total: Int!
  }

  type DraftTask {
    message: String!
    completed: Boolean!
  }

  enum DraftStatus {
    DRAFT
    DECLINED
    REVIEW
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

  ##### VALIDATE USER #####

  type ValidateUserPayload {
    id: ID!
    firstname: String!
    lastname: String!
    ccid: String!
    email: String!
    type: UserType!
  }

  ##### END OF VALIDATE USER #####

  ##### GET USER DRAFTS #####

  type GetUserDraftsPayload {
    id: ID!
    name: String!
    slug: String!
    todos: [String!]!
  }

  ##### END OF GET USER DRAFTS #####

  ##### GET USER PROFILE #####

  type GetUserProfilePayload {
    grade: String!
    studentId: String!
    interests: [InterestName!]!
  }

  type InterestName {
    name: String!
  }

  ##### END OF GET USER PROFILE #####

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

  input UpdateUserInterestsArgs {
    userId: ID!
    roles: [RoleInput!]
    clubId: ID!
  }

  type UpdateUserRolesPayload {
    status: String!
    message: String!
  }

  type Query {
    getUsers(active: Boolean): [GetUsersPayload!]!
    # getUserClubs: [GetUserClubPayload!]!
    getUserClubs: GetUserClubsPayload!
    validateUser(ccid: String!): ValidateUserPayload!
    getUser(identifier: GetUserIdentifierArgs!, type: UserType): GetUserPayload!
    getUserDrafts: [GetUserDraftsPayload!]!
    getUserProfile: GetUserProfilePayload!
  }

  type Mutation {
    deleteUser(identifier: DeleteUserArgs!): DeleteUserPayload!
    updateUserInterests(id: ID!, tags: [TagInput!]!): [Tag!]!
    approveUser(userId: ID!): ApproveUserPayload!
    batchDeleteUsers(userIds: [ID!]!): [BatchDeleteUserPayload!]!
    batchApproveUsers(userIds: [ID!]!): [BatchApproveUserPayload!]!
    # updateUserRoles(data: UpdateUserInterestsArgs!): UpdateUserRolesPayload!
    updateUserRoles(
      userId: ID!
      roles: [RoleInput!]
      clubId: ID!
    ): UpdateUserRolesPayload!
  }
`;

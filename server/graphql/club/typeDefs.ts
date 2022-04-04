import gql from "graphql-tag";

export default gql`
  ##### APPROVE CLUB #####

  type ApproveClubPayload {
    id: String!
    name: String!
    approval: Boolean!
  }

  ##### END OF APPROVE CLUB #####

  ##### DECLINE CLUB #####

  type DeclineClubPayload {
    id: String!
    name: String!
    approval: Boolean!
  }

  ##### END OF DECLINE CLUB #####

  ##### DELETE CLUB #####

  type DeleteClubPayload {
    id: String!
    name: String!
  }

  ##### END OF DELETE CLUB #####

  ##### GET APPROVED CLUBS #####

  type GetApprovedClubsPayload {
    id: ID!
    name: String!
    slug: String!
    description: String
    isMember: Boolean
    availability: ClubAvailability!
    tags: [ClubPageTag!]
    _count: ClubMembersCount!
  }

  type AdminApprovedClubsDelete {
    id: ID!
    name: String!
    members: Int!
  }

  type GetAdminApprovedClubsPayload {
    name: String!
    slug: String!
    availability: String!
    updatedAt: String!
    president: String!
    teacher: String!
    members: Int!
    delete: AdminApprovedClubsDelete!
  }

  ##### END OF GET APPROVED CLUBS #####

  ##### GET UNAPPROVED CLUBS #####

  type GetUnapprovedClubsPayload {
    id: ID!
    name: String!
    availability: String!
    createdAt: String!
    teacher: String!
    president: String!
    # ADD COUNT?
    # roles: [GetUnapprovedClubsPayloadRoles!]!
    # teacher: GetUnapprovedClubsPayloadTeacher!
  }

  type GetUnapprovedClubsPayloadRoles {
    name: String!
    users: [GetUnapprovedClubsPayloadRolesUser!]!
  }

  type GetUnapprovedClubsPayloadRolesUser {
    firstname: String!
    lastname: String!
  }

  type GetUnapprovedClubsPayloadTeacher {
    firstname: String!
    lastname: String!
  }

  ##### END OF GET UNAPPROVED CLUBS #####

  ##### GET CLUB #####

  type ClubPageMember {
    firstname: String!
    lastname: String!
    roles: [ClubPageRole!]!
  }

  type ClubPageRole {
    name: String!
    type: String!
    color: String!
  }

  type GetClubPayload {
    id: ID!
    name: String!
    description: String!
    tags: [ClubPageTag!]
    availability: ClubAvailability!
    meetingDate: String!
    location: String!
    status: ClubStatus!
    email: String!
    links: [Link!]!
    _count: ClubMembersCount!
    isMember: Boolean
    members: [ClubPageMember!]!
  }

  ##### END OF GET CLUB #####

  ##### JOIN CLUB #####

  type JoinClubPayload {
    id: ID!
    firstname: String!
    lastname: String!
    clubs: [JoinClubPayloadClub!]!
  }

  type JoinClubPayloadClub {
    id: ID!
    name: String!
  }

  ##### END OF JOIN CLUB #####

  ##### SEND CLUB FOR APPROVAL #####

  type SendClubForApprovalPayload {
    id: ID!
    name: String!
    status: ClubStatus!
  }

  ##### END OF SEND CLUB FOR APPROVAL #####

  ##### REQUEST TO JOIN CLUB #####

  type RequestToJoinClubPayload {
    id: ID!
    club: RequestClubInfo!
    type: InviteType!
  }

  type RequestClubInfo {
    name: String!
  }

  ##### END OF REQUEST TO JOIN CLUB #####

  ##### GET CLUB INVITES #####

  type GetClubInvitesPayload {
    id: ID!
    user: InviteUser!
    roles: [InviteRole!]!
    type: InviteType!
    createdAt: DateTime!
  }

  type InviteRole {
    id: ID!
    name: String!
  }

  type InviteUser {
    id: ID!
    firstname: String!
    lastname: String!
  }

  ##### END OF GET CLUB INVITES #####

  ##### SHARED #####

  enum ClubStatus {
    DRAFT
    REVIEW
    APPROVED
    DECLINED
  }

  enum ClubAvailability {
    OPEN
    INVITE_ONLY
    CLOSED
  }

  type ClubMembersCount {
    members: Int!
  }

  type ClubPageTag {
    id: ID!
    name: String!
  }

  ##### END OF SHARED #####

  type Club {
    id: ID!
    name: String
    slug: String
    description: String
    email: String
    meetingDate: String
    location: String
    approval: Boolean
    status: ClubStatus
    availability: ClubAvailability
    links: [Link!]
    applicationInfo: ClubApplicationInfo
    tags: [Tag!]
    members: [User!]
    editors: [User!]
    roles: [Role!]
    invites: [Invite!]
    _count: ClubMembersCount
  }

  input CreateClubArgs {
    name: String!
    description: String
    email: String
    meetingDate: String
    location: String
    availability: ClubAvailability
    tags: [InputTags!]
  }

  type CreateClubPayload {
    id: ID!
    name: String!
    slug: String!
    description: String
    email: String
    meetingDate: String
    location: String
    availability: ClubAvailability
    tags: [ClubPageTag!]!
    _count: ClubMembersCount!
    status: ClubStatus!
    approval: Boolean!
  }

  input EditClubArgs {
    description: String
    email: String
    meetingDate: String
    location: String
    availability: ClubAvailability
    tags: [InputTags!]!
  }

  type EditClubPayload {
    id: ID!
    name: String!
    slug: String!
    description: String
    email: String
    meetingDate: String
    location: String
    availability: ClubAvailability
    tags: [ClubPageTag!]
    _count: ClubMembersCount!
    status: ClubStatus!
    approval: Boolean!
  }

  input InputInvites {
    id: ID
  }

  input InputTags {
    name: String
    id: ID
  }

  input LinkInput {
    name: String!
    link: String!
    type: String!
  }

  input InviteInput {
    recipientId: ID!
  }

  input ClubApplicationInfoInput {
    teacherId: ID
    projectedRevenue: [ProjectedRevenueInput!]
    projectedExpenses: [ProjectedExpensesInput!]
    purpose: String!
    membershipRequirements: String!
    dutiesOfMembers: String!
    titlesAndDutiesOfOfficers: String!
    selectionOfOfficers: String!
    officerMinimumGPA: Float!
    percentAttendanceForOfficialMeeting: Int!
    percentAttendanceToApproveDecision: Int!
  }

  input ProjectedRevenueInput {
    name: String!
    amount: Float!
    date: String!
  }

  input ProjectedExpensesInput {
    name: String!
    amount: Float!
    date: String!
  }

  type ClubsCount {
    clubs: Int!
  }

  ##### QUERIES + MUTATIONS #####

  type Query {
    getClub(id: ID, slug: String): GetClubPayload!
    getApprovedClubs: [GetApprovedClubsPayload!]!
    getUnapprovedClubs: [GetUnapprovedClubsPayload!]!
    getAdminApprovedClubs: [GetAdminApprovedClubsPayload!]!
    getClubInvites(clubId: ID!): [GetClubInvitesPayload!]!
  }

  type Mutation {
    joinClub(clubId: ID!): JoinClubPayload!
    leaveClub(clubId: ID!): User
    deleteClub(clubId: ID!): Club
    updateClubTags(clubId: ID!, tagIds: [ID!]!): Club
    createClub(data: CreateClubArgs!): CreateClubPayload!
    # editClub(clubId: ID!, data: EditClubArgs!): Club!
    editClub(clubId: ID!, data: EditClubArgs!): EditClubPayload!
    sendClubForApproval(clubId: ID!): SendClubForApprovalPayload!
    approveClub(clubId: ID!): ApproveClubPayload!
    declineClub(clubId: ID!): DeclineClubPayload!
    requestToJoinClub(clubId: ID!): [RequestToJoinClubPayload!]!
  }

  ##### END OF QUERIES + MUTATIONS #####
`;

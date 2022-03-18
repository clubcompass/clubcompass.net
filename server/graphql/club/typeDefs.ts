import gql from "graphql-tag";

export default gql`
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

  type ClubMembersCount {
    members: Int!
  }

  input CreateClubArgs {
    name: String!
    description: String
    email: String
    meetingDate: String
    location: String
    approval: Boolean
    status: ClubStatus
    availability: ClubAvailability
    links: [LinkInput!]
    applicationInfo: ClubApplicationInfoInput
    tags: [InputTags!]
    invites: [InputInvites!]
    vicePresidentId: ID
    secretaryId: ID
    treasurerId: ID
  }

  input EditClubArgs {
    name: String
    description: String
    email: String
    meetingDate: String
    location: String
    approval: Boolean
    status: ClubStatus
    availability: ClubAvailability
    links: [LinkInput!]
    applicationInfo: ClubApplicationInfoInput
    tags: [InputTags!]
    invites: [InputInvites!]
    vicePresidentId: ID
    secretaryId: ID
    treasurerId: ID
    members: [String!]
    teacherId: ID
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

  type MembersCount {
    members: Int!
  }

  type ClubsCount {
    clubs: Int!
  }

  type GetClubsPayloadTags {
    name: String!
    _count: ClubsCount!
  }

  type GetClubsPayload {
    id: ID!
    name: String!
    slug: String!
    description: String!
    email: String!
    meetingDate: String!
    location: String!
    approval: Boolean!
    status: ClubStatus!
    availability: ClubAvailability!
    tags: [GetClubsPayloadTags!]!
    _count: MembersCount!
  }

  type ClubPageTag {
    name: String!
  }

  type ClubPageMember {
    firstname: String!
    lastname: String!
    roles: [ClubPageRole!]!
  }

  type ClubPageRole {
    name: String!
    type: String!
  }

  type GetClubPayload {
    id: ID!
    name: String!
    description: String!
    tags: [ClubPageTag!]
    availability: ClubAvailability!
    meetingDate: String!
    location: String!
    email: String!
    links: [Link!]!
    _count: MembersCount!
    members: [ClubPageMember!]!
  }

  enum ClubStatus {
    DRAFT
    REVIEW
    APPROVED
  }

  enum ClubAvailability {
    OPEN
    INVITE_ONLY
    CLOSED
  }

  type Query {
    getClub(id: ID, slug: String): GetClubPayload!
    getClubs: [GetClubsPayload!]!
  }

  type Mutation {
    joinClub(clubId: ID!): User
    leaveClub(clubId: ID!): User
    deleteClub(clubId: ID!): Club
    updateClubTags(clubId: ID!, tagIds: [ID!]!): Club
    createClub(data: CreateClubArgs!): Club!
    editClub(clubId: ID!, data: EditClubArgs!): Club!
  }
`;

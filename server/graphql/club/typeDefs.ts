import gql from "graphql-tag";

export default gql`
  type Club {
    id: Int!
    name: String
    slug: String
    description: String
    email: String
    meetingDate: String
    location: String
    approval: Boolean
    status: String
    availability: String
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
    status: String
    availability: String
    links: [LinkInput!]
    applicationInfo: ClubApplicationInfoInput
    tags: [InputTags!]
    invites: [InputInvites!]
    vicePresidentId: Int
    secretaryId: Int
    treasurerId: Int
  }

  input EditClubArgs {
    name: String
    description: String
    email: String
    meetingDate: String
    location: String
    approval: Boolean
    status: String
    availability: String
    links: [LinkInput!]
    applicationInfo: ClubApplicationInfoInput
    tags: [InputTags!]
    invites: [InputInvites!]
    vicePresidentId: Int
    secretaryId: Int
    treasurerId: Int
    members: [String!]
    teacherId: Int
  }

  input InputInvites {
    id: Int
  }

  input InputTags {
    name: String
    id: Int
  }

  input LinkInput {
    name: String!
    link: String!
    type: String!
  }

  input InviteInput {
    recipientId: String!
  }

  input ClubApplicationInfoInput {
    teacherId: Int
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
    id: Int!
    name: String!
    slug: String!
    description: String!
    email: String!
    meetingDate: String!
    location: String!
    approval: Boolean!
    status: String!
    availability: String!
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
    id: Int!
    name: String!
    description: String!
    tags: [ClubPageTag!]
    availability: String!
    meetingDate: String!
    location: String!
    email: String!
    links: [Link!]!
    _count: MembersCount!
    members: [ClubPageMember!]!
  }

  type Query {
    getClub(id: Int, slug: String): GetClubPayload!
    getClubs: [GetClubsPayload!]!
  }

  type Mutation {
    joinClub(clubId: Int!): User
    leaveClub(clubId: Int!): User
    deleteClub(clubId: Int!): Club
    updateClubTags(clubId: Int!, tagIds: [Int!]!): Club
    createClub(data: CreateClubArgs!): Club!
    editClub(clubId: Int!, data: EditClubArgs!): Club!
  }
`;

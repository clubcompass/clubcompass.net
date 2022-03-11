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
    approval: String
    status: String
    availability: String
    links(
      where: LinkWhereInput
      orderBy: LinkOrderByWithRelationInput
      cursor: LinkWhereUniqueInput
      take: Int
      skip: Int
      distinct: LinkScalarFieldEnum
    ): [Link!]!
    applicationInfo: ClubApplicationInfo
    tags(
      where: TagWhereInput
      orderBy: TagOrderByWithRelationInput
      cursor: TagWhereUniqueInput
      take: Int
      skip: Int
      distinct: TagScalarFieldEnum
    ): [Tag!]!
    members(
      where: UserWhereInput
      orderBy: UserOrderByWithRelationInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserScalarFieldEnum
    ): [User!]!
    editors(
      where: UserWhereInput
      orderBy: UserOrderByWithRelationInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserScalarFieldEnum
    ): [User!]!
    roles(
      where: RoleWhereInput
      orderBy: RoleOrderByWithRelationInput
      cursor: RoleWhereUniqueInput
      take: Int
      skip: Int
      distinct: RoleScalarFieldEnum
    ): [Role!]!
    invites(
      where: InviteWhereInput
      orderBy: InviteOrderByWithRelationInput
      cursor: InviteWhereUniqueInput
      take: Int
      skip: Int
      distinct: InviteScalarFieldEnum
    ): [Invite!]!
    _count: ClubCountOutputType!
  }

  input CreateClubArgs {
    name: String!
    description: String
    email: String
    meetingDate: String
    location: String
    approval: String
    status: String
    availability: String
    links: [LinkInput!]
    applicationInfo: ClubApplicationInfoInput
    tagIds: [Int!]
    inviteIds: [Int!]
    vicePresidentId: Int
    secretaryId: Int
    treasurerId: Int
  }

  input LinkInput {
    name: String!
    link: String!
    type: String!
  }

  input TagInput {
    name: String!
  }

  input InviteInput {
    recipientId: String!
  }

  input ClubApplicationInfoInput {
    teacherId: String
    projectedRevenue: [ProjectedRevenueInput!]
    projectedExpenses: [ProjectedExpensesInput!]
    purpose: String
    membershipRequirements: String
    dutiesOfMembers: String
    titlesAndDutiesOfOfficers: String
    selectionOfOfficers: String
    officerMinimumGPA: Float
    percentAttendanceForOfficialMeeting: Int
    percentAttendanceToApproveDecision: Int
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

  type Query {
    findUniqueClub(where: ClubWhereUniqueInput!): Club
    findFirstClub(
      where: ClubWhereInput
      orderBy: [ClubOrderByWithRelationInput]
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ClubScalarFieldEnum]
    ): Club
    findManyClub(
      where: ClubWhereInput
      orderBy: [ClubOrderByWithRelationInput]
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ClubScalarFieldEnum]
    ): [Club!]
    findManyClubCount(
      where: ClubWhereInput
      orderBy: [ClubOrderByWithRelationInput]
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ClubScalarFieldEnum]
    ): Int!
    aggregateClub(
      where: ClubWhereInput
      orderBy: [ClubOrderByWithRelationInput]
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateClub
  }
  type Mutation {
    joinClub(clubId: Int!): User
    leaveClub(clubId: Int!): User
    deleteClub(id: Int!): Club
    updateClubTags(clubId: Int!, tagIds: [Int!]!): Club
    createClub(data: CreateClubArgs!): Club
    createOneClub(data: ClubCreateInput!): Club!
    updateOneClub(data: ClubUpdateInput!, where: ClubWhereUniqueInput!): Club!
    deleteOneClub(where: ClubWhereUniqueInput!): Club
    upsertOneClub(
      where: ClubWhereUniqueInput!
      create: ClubCreateInput!
      update: ClubUpdateInput!
    ): Club
    deleteManyClub(where: ClubWhereInput): BatchPayload
    updateManyClub(
      data: ClubUpdateManyMutationInput!
      where: ClubWhereInput
    ): BatchPayload
  }
`;

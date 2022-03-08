import gql from 'graphql-tag'

export default gql`
  type ClubApplicationInfo {
    id: Int!
    teacher: User!
    userId: Int!
    club: Club!
    clubId: Int!
    projectedRevenue(
      where: ProjectedRevenueWhereInput
      orderBy: ProjectedRevenueOrderByWithRelationInput
      cursor: ProjectedRevenueWhereUniqueInput
      take: Int
      skip: Int
      distinct: ProjectedRevenueScalarFieldEnum
    ): [ProjectedRevenue!]!
    projectedExpenses(
      where: ProjectedExpensesWhereInput
      orderBy: ProjectedExpensesOrderByWithRelationInput
      cursor: ProjectedExpensesWhereUniqueInput
      take: Int
      skip: Int
      distinct: ProjectedExpensesScalarFieldEnum
    ): [ProjectedExpenses!]!
    purpose: String!
    membershipRequirements: String!
    dutiesOfMembers: String!
    titlesAndDutiesOfOfficers: String!
    selectionOfOfficers: String!
    officerMinimumGPA: Float!
    percentAttendanceForOfficialMeeting: Int!
    percentAttendanceToApproveDecision: Int!
    _count: ClubApplicationInfoCountOutputType!
  }

  type Query {
    findUniqueClubApplicationInfo(
      where: ClubApplicationInfoWhereUniqueInput!
    ): ClubApplicationInfo
    findFirstClubApplicationInfo(
      where: ClubApplicationInfoWhereInput
      orderBy: [ClubApplicationInfoOrderByWithRelationInput]
      cursor: ClubApplicationInfoWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ClubApplicationInfoScalarFieldEnum]
    ): ClubApplicationInfo
    findManyClubApplicationInfo(
      where: ClubApplicationInfoWhereInput
      orderBy: [ClubApplicationInfoOrderByWithRelationInput]
      cursor: ClubApplicationInfoWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ClubApplicationInfoScalarFieldEnum]
    ): [ClubApplicationInfo!]
    findManyClubApplicationInfoCount(
      where: ClubApplicationInfoWhereInput
      orderBy: [ClubApplicationInfoOrderByWithRelationInput]
      cursor: ClubApplicationInfoWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ClubApplicationInfoScalarFieldEnum]
    ): Int!
    aggregateClubApplicationInfo(
      where: ClubApplicationInfoWhereInput
      orderBy: [ClubApplicationInfoOrderByWithRelationInput]
      cursor: ClubApplicationInfoWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateClubApplicationInfo
  }

  type Mutation {
    createOneClubApplicationInfo(
      data: ClubApplicationInfoCreateInput!
    ): ClubApplicationInfo!
    updateOneClubApplicationInfo(
      data: ClubApplicationInfoUpdateInput!
      where: ClubApplicationInfoWhereUniqueInput!
    ): ClubApplicationInfo!
    deleteOneClubApplicationInfo(
      where: ClubApplicationInfoWhereUniqueInput!
    ): ClubApplicationInfo
    upsertOneClubApplicationInfo(
      where: ClubApplicationInfoWhereUniqueInput!
      create: ClubApplicationInfoCreateInput!
      update: ClubApplicationInfoUpdateInput!
    ): ClubApplicationInfo
    deleteManyClubApplicationInfo(
      where: ClubApplicationInfoWhereInput
    ): BatchPayload
    updateManyClubApplicationInfo(
      data: ClubApplicationInfoUpdateManyMutationInput!
      where: ClubApplicationInfoWhereInput
    ): BatchPayload
  }
`

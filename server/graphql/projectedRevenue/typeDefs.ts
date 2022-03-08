import gql from 'graphql-tag'

export default gql`
  type ProjectedRevenue {
    id: Int!
    club: ClubApplicationInfo!
    clubId: Int!
    name: String!
    amount: Float!
    date: String!
  }

  type Query {
    findUniqueProjectedRevenue(
      where: ProjectedRevenueWhereUniqueInput!
    ): ProjectedRevenue
    findFirstProjectedRevenue(
      where: ProjectedRevenueWhereInput
      orderBy: [ProjectedRevenueOrderByWithRelationInput]
      cursor: ProjectedRevenueWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProjectedRevenueScalarFieldEnum]
    ): ProjectedRevenue
    findManyProjectedRevenue(
      where: ProjectedRevenueWhereInput
      orderBy: [ProjectedRevenueOrderByWithRelationInput]
      cursor: ProjectedRevenueWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProjectedRevenueScalarFieldEnum]
    ): [ProjectedRevenue!]
    findManyProjectedRevenueCount(
      where: ProjectedRevenueWhereInput
      orderBy: [ProjectedRevenueOrderByWithRelationInput]
      cursor: ProjectedRevenueWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProjectedRevenueScalarFieldEnum]
    ): Int!
    aggregateProjectedRevenue(
      where: ProjectedRevenueWhereInput
      orderBy: [ProjectedRevenueOrderByWithRelationInput]
      cursor: ProjectedRevenueWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateProjectedRevenue
  }

  type Mutation {
    createOneProjectedRevenue(
      data: ProjectedRevenueCreateInput!
    ): ProjectedRevenue!
    updateOneProjectedRevenue(
      data: ProjectedRevenueUpdateInput!
      where: ProjectedRevenueWhereUniqueInput!
    ): ProjectedRevenue!
    deleteOneProjectedRevenue(
      where: ProjectedRevenueWhereUniqueInput!
    ): ProjectedRevenue
    upsertOneProjectedRevenue(
      where: ProjectedRevenueWhereUniqueInput!
      create: ProjectedRevenueCreateInput!
      update: ProjectedRevenueUpdateInput!
    ): ProjectedRevenue
    deleteManyProjectedRevenue(where: ProjectedRevenueWhereInput): BatchPayload
    updateManyProjectedRevenue(
      data: ProjectedRevenueUpdateManyMutationInput!
      where: ProjectedRevenueWhereInput
    ): BatchPayload
  }
`

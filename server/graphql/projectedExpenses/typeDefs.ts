import gql from 'graphql-tag'

export default gql`
  type ProjectedExpenses {
    id: Int!
    club: ClubApplicationInfo!
    clubId: Int!
    name: String!
    amount: Float!
    date: String!
  }

  type Query {
    findUniqueProjectedExpenses(
      where: ProjectedExpensesWhereUniqueInput!
    ): ProjectedExpenses
    findFirstProjectedExpenses(
      where: ProjectedExpensesWhereInput
      orderBy: [ProjectedExpensesOrderByWithRelationInput]
      cursor: ProjectedExpensesWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProjectedExpensesScalarFieldEnum]
    ): ProjectedExpenses
    findManyProjectedExpenses(
      where: ProjectedExpensesWhereInput
      orderBy: [ProjectedExpensesOrderByWithRelationInput]
      cursor: ProjectedExpensesWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProjectedExpensesScalarFieldEnum]
    ): [ProjectedExpenses!]
    findManyProjectedExpensesCount(
      where: ProjectedExpensesWhereInput
      orderBy: [ProjectedExpensesOrderByWithRelationInput]
      cursor: ProjectedExpensesWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ProjectedExpensesScalarFieldEnum]
    ): Int!
    aggregateProjectedExpenses(
      where: ProjectedExpensesWhereInput
      orderBy: [ProjectedExpensesOrderByWithRelationInput]
      cursor: ProjectedExpensesWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateProjectedExpenses
  }

  type Mutation {
    createOneProjectedExpenses(
      data: ProjectedExpensesCreateInput!
    ): ProjectedExpenses!
    updateOneProjectedExpenses(
      data: ProjectedExpensesUpdateInput!
      where: ProjectedExpensesWhereUniqueInput!
    ): ProjectedExpenses!
    deleteOneProjectedExpenses(
      where: ProjectedExpensesWhereUniqueInput!
    ): ProjectedExpenses
    upsertOneProjectedExpenses(
      where: ProjectedExpensesWhereUniqueInput!
      create: ProjectedExpensesCreateInput!
      update: ProjectedExpensesUpdateInput!
    ): ProjectedExpenses
    deleteManyProjectedExpenses(
      where: ProjectedExpensesWhereInput
    ): BatchPayload
    updateManyProjectedExpenses(
      data: ProjectedExpensesUpdateManyMutationInput!
      where: ProjectedExpensesWhereInput
    ): BatchPayload
  }
`

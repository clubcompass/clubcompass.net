import gql from 'graphql-tag'

export default gql`
  type Tag {
    id: Int!
    name: String!
    clubs(
      where: ClubWhereInput
      orderBy: ClubOrderByWithRelationInput
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
      distinct: ClubScalarFieldEnum
    ): [Club!]!
    interestedUsers(
      where: UserWhereInput
      orderBy: UserOrderByWithRelationInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserScalarFieldEnum
    ): [User!]!
    _count: TagCountOutputType!
  }

  type Query {
    findUniqueTag(where: TagWhereUniqueInput!): Tag
    findFirstTag(
      where: TagWhereInput
      orderBy: [TagOrderByWithRelationInput]
      cursor: TagWhereUniqueInput
      take: Int
      skip: Int
      distinct: [TagScalarFieldEnum]
    ): Tag
    findManyTag(
      where: TagWhereInput
      orderBy: [TagOrderByWithRelationInput]
      cursor: TagWhereUniqueInput
      take: Int
      skip: Int
      distinct: [TagScalarFieldEnum]
    ): [Tag!]
    findManyTagCount(
      where: TagWhereInput
      orderBy: [TagOrderByWithRelationInput]
      cursor: TagWhereUniqueInput
      take: Int
      skip: Int
      distinct: [TagScalarFieldEnum]
    ): Int!
    aggregateTag(
      where: TagWhereInput
      orderBy: [TagOrderByWithRelationInput]
      cursor: TagWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateTag
  }

  type Mutation {
    createOneTag(data: TagCreateInput!): Tag!
    updateOneTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag!
    deleteOneTag(where: TagWhereUniqueInput!): Tag
    upsertOneTag(
      where: TagWhereUniqueInput!
      create: TagCreateInput!
      update: TagUpdateInput!
    ): Tag
    deleteManyTag(where: TagWhereInput): BatchPayload
    updateManyTag(
      data: TagUpdateManyMutationInput!
      where: TagWhereInput
    ): BatchPayload
  }
`

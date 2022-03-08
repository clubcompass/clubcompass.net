import gql from 'graphql-tag'

export default gql`
  type Link {
    id: Int!
    club: Club!
    clubId: Int!
    name: String
    link: String!
    type: String!
  }

  type Query {
    findUniqueLink(where: LinkWhereUniqueInput!): Link
    findFirstLink(
      where: LinkWhereInput
      orderBy: [LinkOrderByWithRelationInput]
      cursor: LinkWhereUniqueInput
      take: Int
      skip: Int
      distinct: [LinkScalarFieldEnum]
    ): Link
    findManyLink(
      where: LinkWhereInput
      orderBy: [LinkOrderByWithRelationInput]
      cursor: LinkWhereUniqueInput
      take: Int
      skip: Int
      distinct: [LinkScalarFieldEnum]
    ): [Link!]
    findManyLinkCount(
      where: LinkWhereInput
      orderBy: [LinkOrderByWithRelationInput]
      cursor: LinkWhereUniqueInput
      take: Int
      skip: Int
      distinct: [LinkScalarFieldEnum]
    ): Int!
    aggregateLink(
      where: LinkWhereInput
      orderBy: [LinkOrderByWithRelationInput]
      cursor: LinkWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateLink
  }

  type Mutation {
    createOneLink(data: LinkCreateInput!): Link!
    updateOneLink(data: LinkUpdateInput!, where: LinkWhereUniqueInput!): Link!
    deleteOneLink(where: LinkWhereUniqueInput!): Link
    upsertOneLink(
      where: LinkWhereUniqueInput!
      create: LinkCreateInput!
      update: LinkUpdateInput!
    ): Link
    deleteManyLink(where: LinkWhereInput): BatchPayload
    updateManyLink(
      data: LinkUpdateManyMutationInput!
      where: LinkWhereInput
    ): BatchPayload
  }
`

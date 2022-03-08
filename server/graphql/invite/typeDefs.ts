import gql from 'graphql-tag'

export default gql`
  type Invite {
    id: Int!
    status: String!
    club: Club!
    clubId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    findUniqueInvite(where: InviteWhereUniqueInput!): Invite
    findFirstInvite(
      where: InviteWhereInput
      orderBy: [InviteOrderByWithRelationInput]
      cursor: InviteWhereUniqueInput
      take: Int
      skip: Int
      distinct: [InviteScalarFieldEnum]
    ): Invite
    findManyInvite(
      where: InviteWhereInput
      orderBy: [InviteOrderByWithRelationInput]
      cursor: InviteWhereUniqueInput
      take: Int
      skip: Int
      distinct: [InviteScalarFieldEnum]
    ): [Invite!]
    findManyInviteCount(
      where: InviteWhereInput
      orderBy: [InviteOrderByWithRelationInput]
      cursor: InviteWhereUniqueInput
      take: Int
      skip: Int
      distinct: [InviteScalarFieldEnum]
    ): Int!
    aggregateInvite(
      where: InviteWhereInput
      orderBy: [InviteOrderByWithRelationInput]
      cursor: InviteWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateInvite
  }

  type Mutation {
    createOneInvite(data: InviteCreateInput!): Invite!
    updateOneInvite(
      data: InviteUpdateInput!
      where: InviteWhereUniqueInput!
    ): Invite!
    deleteOneInvite(where: InviteWhereUniqueInput!): Invite
    upsertOneInvite(
      where: InviteWhereUniqueInput!
      create: InviteCreateInput!
      update: InviteUpdateInput!
    ): Invite
    deleteManyInvite(where: InviteWhereInput): BatchPayload
    updateManyInvite(
      data: InviteUpdateManyMutationInput!
      where: InviteWhereInput
    ): BatchPayload
  }
`

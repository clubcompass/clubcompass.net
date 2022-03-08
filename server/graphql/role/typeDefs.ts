import gql from 'graphql-tag'

export default gql`
  type Role {
    id: Int!
    name: String!
    color: String!
    description: String!
    users(
      where: UserWhereInput
      orderBy: UserOrderByWithRelationInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: UserScalarFieldEnum
    ): [User!]!
    club: Club!
    clubId: Int!
    type: String!
    _count: RoleCountOutputType!
  }

  type Query {
    findUniqueRole(where: RoleWhereUniqueInput!): Role
    findFirstRole(
      where: RoleWhereInput
      orderBy: [RoleOrderByWithRelationInput]
      cursor: RoleWhereUniqueInput
      take: Int
      skip: Int
      distinct: [RoleScalarFieldEnum]
    ): Role
    findManyRole(
      where: RoleWhereInput
      orderBy: [RoleOrderByWithRelationInput]
      cursor: RoleWhereUniqueInput
      take: Int
      skip: Int
      distinct: [RoleScalarFieldEnum]
    ): [Role!]
    findManyRoleCount(
      where: RoleWhereInput
      orderBy: [RoleOrderByWithRelationInput]
      cursor: RoleWhereUniqueInput
      take: Int
      skip: Int
      distinct: [RoleScalarFieldEnum]
    ): Int!
    aggregateRole(
      where: RoleWhereInput
      orderBy: [RoleOrderByWithRelationInput]
      cursor: RoleWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateRole
  }

  type Mutation {
    createOneRole(data: RoleCreateInput!): Role!
    updateOneRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role!
    deleteOneRole(where: RoleWhereUniqueInput!): Role
    upsertOneRole(
      where: RoleWhereUniqueInput!
      create: RoleCreateInput!
      update: RoleUpdateInput!
    ): Role
    deleteManyRole(where: RoleWhereInput): BatchPayload
    updateManyRole(
      data: RoleUpdateManyMutationInput!
      where: RoleWhereInput
    ): BatchPayload
  }
`

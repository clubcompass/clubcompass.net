import gql from 'graphql-tag'

export default gql`
  type User {
    id: Int!
    ccid: String!
    firstname: String!
    lastname: String!
    email: String!
    emailVerified: Boolean!
    password: String!
    grade: String!
    type: String!
    interests(
      where: TagWhereInput
      orderBy: TagOrderByWithRelationInput
      cursor: TagWhereUniqueInput
      take: Int
      skip: Int
      distinct: TagScalarFieldEnum
    ): [Tag!]!
    clubs(
      where: ClubWhereInput
      orderBy: ClubOrderByWithRelationInput
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
      distinct: ClubScalarFieldEnum
    ): [Club!]!
    canEdit(
      where: ClubWhereInput
      orderBy: ClubOrderByWithRelationInput
      cursor: ClubWhereUniqueInput
      take: Int
      skip: Int
      distinct: ClubScalarFieldEnum
    ): [Club!]!
    advisor(
      where: ClubApplicationInfoWhereInput
      orderBy: ClubApplicationInfoOrderByWithRelationInput
      cursor: ClubApplicationInfoWhereUniqueInput
      take: Int
      skip: Int
      distinct: ClubApplicationInfoScalarFieldEnum
    ): [ClubApplicationInfo!]!
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
    _count: UserCountOutputType!
  }

  type Query {
    findUniqueUser(where: UserWhereUniqueInput!): User
    findFirstUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): User
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): Int!
    aggregateUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
    ): AggregateUser
  }

  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      data: UserUpdateManyMutationInput!
      where: UserWhereInput
    ): BatchPayload
  }
`

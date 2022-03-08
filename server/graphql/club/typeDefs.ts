import gql from 'graphql-tag'

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
`

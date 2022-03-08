import * as Client from '@prisma/client'

import { Context } from './ctx'

import { GraphQLResolveInfo } from 'graphql'

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<R>

export interface Resolvers {
  [key: string]: { [key: string]: Resolver<any, any, any> }
  Club?: Club
  Link?: Link
  ClubApplicationInfo?: ClubApplicationInfo
  Tag?: Tag
  User?: User
  Invite?: Invite
  Role?: Role
  ProjectedRevenue?: ProjectedRevenue
  ProjectedExpenses?: ProjectedExpenses
  Query?: Query
  Mutation?: Mutation
  AggregateClub?: AggregateClub
  ClubGroupByOutputType?: ClubGroupByOutputType
  AggregateLink?: AggregateLink
  LinkGroupByOutputType?: LinkGroupByOutputType
  AggregateClubApplicationInfo?: AggregateClubApplicationInfo
  ClubApplicationInfoGroupByOutputType?: ClubApplicationInfoGroupByOutputType
  AggregateTag?: AggregateTag
  TagGroupByOutputType?: TagGroupByOutputType
  AggregateUser?: AggregateUser
  UserGroupByOutputType?: UserGroupByOutputType
  AggregateInvite?: AggregateInvite
  InviteGroupByOutputType?: InviteGroupByOutputType
  AggregateRole?: AggregateRole
  RoleGroupByOutputType?: RoleGroupByOutputType
  AggregateProjectedRevenue?: AggregateProjectedRevenue
  ProjectedRevenueGroupByOutputType?: ProjectedRevenueGroupByOutputType
  AggregateProjectedExpenses?: AggregateProjectedExpenses
  ProjectedExpensesGroupByOutputType?: ProjectedExpensesGroupByOutputType
  AffectedRowsOutput?: AffectedRowsOutput
  ClubCountOutputType?: ClubCountOutputType
  ClubCountAggregateOutputType?: ClubCountAggregateOutputType
  ClubAvgAggregateOutputType?: ClubAvgAggregateOutputType
  ClubSumAggregateOutputType?: ClubSumAggregateOutputType
  ClubMinAggregateOutputType?: ClubMinAggregateOutputType
  ClubMaxAggregateOutputType?: ClubMaxAggregateOutputType
  LinkCountAggregateOutputType?: LinkCountAggregateOutputType
  LinkAvgAggregateOutputType?: LinkAvgAggregateOutputType
  LinkSumAggregateOutputType?: LinkSumAggregateOutputType
  LinkMinAggregateOutputType?: LinkMinAggregateOutputType
  LinkMaxAggregateOutputType?: LinkMaxAggregateOutputType
  ClubApplicationInfoCountOutputType?: ClubApplicationInfoCountOutputType
  ClubApplicationInfoCountAggregateOutputType?: ClubApplicationInfoCountAggregateOutputType
  ClubApplicationInfoAvgAggregateOutputType?: ClubApplicationInfoAvgAggregateOutputType
  ClubApplicationInfoSumAggregateOutputType?: ClubApplicationInfoSumAggregateOutputType
  ClubApplicationInfoMinAggregateOutputType?: ClubApplicationInfoMinAggregateOutputType
  ClubApplicationInfoMaxAggregateOutputType?: ClubApplicationInfoMaxAggregateOutputType
  TagCountOutputType?: TagCountOutputType
  TagCountAggregateOutputType?: TagCountAggregateOutputType
  TagAvgAggregateOutputType?: TagAvgAggregateOutputType
  TagSumAggregateOutputType?: TagSumAggregateOutputType
  TagMinAggregateOutputType?: TagMinAggregateOutputType
  TagMaxAggregateOutputType?: TagMaxAggregateOutputType
  UserCountOutputType?: UserCountOutputType
  UserCountAggregateOutputType?: UserCountAggregateOutputType
  UserAvgAggregateOutputType?: UserAvgAggregateOutputType
  UserSumAggregateOutputType?: UserSumAggregateOutputType
  UserMinAggregateOutputType?: UserMinAggregateOutputType
  UserMaxAggregateOutputType?: UserMaxAggregateOutputType
  InviteCountAggregateOutputType?: InviteCountAggregateOutputType
  InviteAvgAggregateOutputType?: InviteAvgAggregateOutputType
  InviteSumAggregateOutputType?: InviteSumAggregateOutputType
  InviteMinAggregateOutputType?: InviteMinAggregateOutputType
  InviteMaxAggregateOutputType?: InviteMaxAggregateOutputType
  RoleCountOutputType?: RoleCountOutputType
  RoleCountAggregateOutputType?: RoleCountAggregateOutputType
  RoleAvgAggregateOutputType?: RoleAvgAggregateOutputType
  RoleSumAggregateOutputType?: RoleSumAggregateOutputType
  RoleMinAggregateOutputType?: RoleMinAggregateOutputType
  RoleMaxAggregateOutputType?: RoleMaxAggregateOutputType
  ProjectedRevenueCountAggregateOutputType?: ProjectedRevenueCountAggregateOutputType
  ProjectedRevenueAvgAggregateOutputType?: ProjectedRevenueAvgAggregateOutputType
  ProjectedRevenueSumAggregateOutputType?: ProjectedRevenueSumAggregateOutputType
  ProjectedRevenueMinAggregateOutputType?: ProjectedRevenueMinAggregateOutputType
  ProjectedRevenueMaxAggregateOutputType?: ProjectedRevenueMaxAggregateOutputType
  ProjectedExpensesCountAggregateOutputType?: ProjectedExpensesCountAggregateOutputType
  ProjectedExpensesAvgAggregateOutputType?: ProjectedExpensesAvgAggregateOutputType
  ProjectedExpensesSumAggregateOutputType?: ProjectedExpensesSumAggregateOutputType
  ProjectedExpensesMinAggregateOutputType?: ProjectedExpensesMinAggregateOutputType
  ProjectedExpensesMaxAggregateOutputType?: ProjectedExpensesMaxAggregateOutputType
}

export interface Club {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Club, {}, number>
  name?: Resolver<Client.Club, {}, string | null>
  slug?: Resolver<Client.Club, {}, string | null>
  description?: Resolver<Client.Club, {}, string | null>
  email?: Resolver<Client.Club, {}, string | null>
  meetingDate?: Resolver<Client.Club, {}, string | null>
  location?: Resolver<Client.Club, {}, string | null>
  approval?: Resolver<Client.Club, {}, string | null>
  status?: Resolver<Client.Club, {}, string | null>
  availability?: Resolver<Client.Club, {}, string | null>
  links?: Resolver<Client.Club, ClubLinksArgs, Client.Link[] | null>
  applicationInfo?: Resolver<Client.Club, {}, Client.ClubApplicationInfo | null>
  tags?: Resolver<Client.Club, ClubTagsArgs, Client.Tag[] | null>
  members?: Resolver<Client.Club, ClubMembersArgs, Client.User[] | null>
  editors?: Resolver<Client.Club, ClubEditorsArgs, Client.User[] | null>
  roles?: Resolver<Client.Club, ClubRolesArgs, Client.Role[] | null>
  invites?: Resolver<Client.Club, ClubInvitesArgs, Client.Invite[] | null>
  _count?: Resolver<Client.Club, {}, Client.Prisma.ClubCountOutputType>
}

export interface Link {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Link, {}, number>
  club?: Resolver<Client.Link, {}, Client.Club>
  clubId?: Resolver<Client.Link, {}, number>
  name?: Resolver<Client.Link, {}, string | null>
  link?: Resolver<Client.Link, {}, string>
  type?: Resolver<Client.Link, {}, string>
}

export interface ClubApplicationInfo {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.ClubApplicationInfo, {}, number>
  teacher?: Resolver<Client.ClubApplicationInfo, {}, Client.User>
  userId?: Resolver<Client.ClubApplicationInfo, {}, number>
  club?: Resolver<Client.ClubApplicationInfo, {}, Client.Club>
  clubId?: Resolver<Client.ClubApplicationInfo, {}, number>
  projectedRevenue?: Resolver<
    Client.ClubApplicationInfo,
    ClubApplicationInfoProjectedRevenueArgs,
    Client.ProjectedRevenue[] | null
  >
  projectedExpenses?: Resolver<
    Client.ClubApplicationInfo,
    ClubApplicationInfoProjectedExpensesArgs,
    Client.ProjectedExpenses[] | null
  >
  purpose?: Resolver<Client.ClubApplicationInfo, {}, string>
  membershipRequirements?: Resolver<Client.ClubApplicationInfo, {}, string>
  dutiesOfMembers?: Resolver<Client.ClubApplicationInfo, {}, string>
  titlesAndDutiesOfOfficers?: Resolver<Client.ClubApplicationInfo, {}, string>
  selectionOfOfficers?: Resolver<Client.ClubApplicationInfo, {}, string>
  officerMinimumGPA?: Resolver<Client.ClubApplicationInfo, {}, number>
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.ClubApplicationInfo,
    {},
    number
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.ClubApplicationInfo,
    {},
    number
  >
  _count?: Resolver<
    Client.ClubApplicationInfo,
    {},
    Client.Prisma.ClubApplicationInfoCountOutputType
  >
}

export interface Tag {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Tag, {}, number>
  name?: Resolver<Client.Tag, {}, string>
  clubs?: Resolver<Client.Tag, TagClubsArgs, Client.Club[] | null>
  interestedUsers?: Resolver<
    Client.Tag,
    TagInterestedUsersArgs,
    Client.User[] | null
  >
  _count?: Resolver<Client.Tag, {}, Client.Prisma.TagCountOutputType>
}

export interface User {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.User, {}, number>
  ccid?: Resolver<Client.User, {}, string>
  firstname?: Resolver<Client.User, {}, string>
  lastname?: Resolver<Client.User, {}, string>
  email?: Resolver<Client.User, {}, string>
  emailVerified?: Resolver<Client.User, {}, boolean>
  password?: Resolver<Client.User, {}, string>
  grade?: Resolver<Client.User, {}, string>
  type?: Resolver<Client.User, {}, string>
  interests?: Resolver<Client.User, UserInterestsArgs, Client.Tag[] | null>
  clubs?: Resolver<Client.User, UserClubsArgs, Client.Club[] | null>
  canEdit?: Resolver<Client.User, UserCanEditArgs, Client.Club[] | null>
  advisor?: Resolver<
    Client.User,
    UserAdvisorArgs,
    Client.ClubApplicationInfo[] | null
  >
  roles?: Resolver<Client.User, UserRolesArgs, Client.Role[] | null>
  invites?: Resolver<Client.User, UserInvitesArgs, Client.Invite[] | null>
  _count?: Resolver<Client.User, {}, Client.Prisma.UserCountOutputType>
}

export interface Invite {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Invite, {}, number>
  status?: Resolver<Client.Invite, {}, string>
  club?: Resolver<Client.Invite, {}, Client.Club>
  clubId?: Resolver<Client.Invite, {}, number>
  user?: Resolver<Client.Invite, {}, Client.User>
  userId?: Resolver<Client.Invite, {}, number>
}

export interface Role {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Role, {}, number>
  name?: Resolver<Client.Role, {}, string>
  color?: Resolver<Client.Role, {}, string>
  description?: Resolver<Client.Role, {}, string>
  users?: Resolver<Client.Role, RoleUsersArgs, Client.User[] | null>
  club?: Resolver<Client.Role, {}, Client.Club>
  clubId?: Resolver<Client.Role, {}, number>
  type?: Resolver<Client.Role, {}, string>
  _count?: Resolver<Client.Role, {}, Client.Prisma.RoleCountOutputType>
}

export interface ProjectedRevenue {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.ProjectedRevenue, {}, number>
  club?: Resolver<Client.ProjectedRevenue, {}, Client.ClubApplicationInfo>
  clubId?: Resolver<Client.ProjectedRevenue, {}, number>
  name?: Resolver<Client.ProjectedRevenue, {}, string>
  amount?: Resolver<Client.ProjectedRevenue, {}, number>
  date?: Resolver<Client.ProjectedRevenue, {}, string>
}

export interface ProjectedExpenses {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.ProjectedExpenses, {}, number>
  club?: Resolver<Client.ProjectedExpenses, {}, Client.ClubApplicationInfo>
  clubId?: Resolver<Client.ProjectedExpenses, {}, number>
  name?: Resolver<Client.ProjectedExpenses, {}, string>
  amount?: Resolver<Client.ProjectedExpenses, {}, number>
  date?: Resolver<Client.ProjectedExpenses, {}, string>
}

export interface Query {
  [key: string]: Resolver<any, any, any>
  findFirstClub?: Resolver<{}, FindFirstClubArgs, Client.Club | null>
  findManyClub?: Resolver<{}, FindManyClubArgs, Client.Club[]>
  findManyClubCount?: Resolver<{}, FindManyClubArgs, number>
  aggregateClub?: Resolver<
    {},
    AggregateClubArgs,
    Client.Prisma.GetClubAggregateType<AggregateClubArgs>
  >
  groupByClub?: Resolver<
    {},
    GroupByClubArgs,
    Client.Prisma.ClubGroupByOutputType[]
  >
  findUniqueClub?: Resolver<{}, FindUniqueClubArgs, Client.Club | null>
  findFirstLink?: Resolver<{}, FindFirstLinkArgs, Client.Link | null>
  findManyLink?: Resolver<{}, FindManyLinkArgs, Client.Link[]>
  findManyLinkCount?: Resolver<{}, FindManyLinkArgs, number>
  aggregateLink?: Resolver<
    {},
    AggregateLinkArgs,
    Client.Prisma.GetLinkAggregateType<AggregateLinkArgs>
  >
  groupByLink?: Resolver<
    {},
    GroupByLinkArgs,
    Client.Prisma.LinkGroupByOutputType[]
  >
  findUniqueLink?: Resolver<{}, FindUniqueLinkArgs, Client.Link | null>
  findFirstClubApplicationInfo?: Resolver<
    {},
    FindFirstClubApplicationInfoArgs,
    Client.ClubApplicationInfo | null
  >
  findManyClubApplicationInfo?: Resolver<
    {},
    FindManyClubApplicationInfoArgs,
    Client.ClubApplicationInfo[]
  >
  findManyClubApplicationInfoCount?: Resolver<
    {},
    FindManyClubApplicationInfoArgs,
    number
  >
  aggregateClubApplicationInfo?: Resolver<
    {},
    AggregateClubApplicationInfoArgs,
    Client.Prisma.GetClubApplicationInfoAggregateType<AggregateClubApplicationInfoArgs>
  >
  groupByClubApplicationInfo?: Resolver<
    {},
    GroupByClubApplicationInfoArgs,
    Client.Prisma.ClubApplicationInfoGroupByOutputType[]
  >
  findUniqueClubApplicationInfo?: Resolver<
    {},
    FindUniqueClubApplicationInfoArgs,
    Client.ClubApplicationInfo | null
  >
  findFirstTag?: Resolver<{}, FindFirstTagArgs, Client.Tag | null>
  findManyTag?: Resolver<{}, FindManyTagArgs, Client.Tag[]>
  findManyTagCount?: Resolver<{}, FindManyTagArgs, number>
  aggregateTag?: Resolver<
    {},
    AggregateTagArgs,
    Client.Prisma.GetTagAggregateType<AggregateTagArgs>
  >
  groupByTag?: Resolver<
    {},
    GroupByTagArgs,
    Client.Prisma.TagGroupByOutputType[]
  >
  findUniqueTag?: Resolver<{}, FindUniqueTagArgs, Client.Tag | null>
  findFirstUser?: Resolver<{}, FindFirstUserArgs, Client.User | null>
  findManyUser?: Resolver<{}, FindManyUserArgs, Client.User[]>
  findManyUserCount?: Resolver<{}, FindManyUserArgs, number>
  aggregateUser?: Resolver<
    {},
    AggregateUserArgs,
    Client.Prisma.GetUserAggregateType<AggregateUserArgs>
  >
  groupByUser?: Resolver<
    {},
    GroupByUserArgs,
    Client.Prisma.UserGroupByOutputType[]
  >
  findUniqueUser?: Resolver<{}, FindUniqueUserArgs, Client.User | null>
  findFirstInvite?: Resolver<{}, FindFirstInviteArgs, Client.Invite | null>
  findManyInvite?: Resolver<{}, FindManyInviteArgs, Client.Invite[]>
  findManyInviteCount?: Resolver<{}, FindManyInviteArgs, number>
  aggregateInvite?: Resolver<
    {},
    AggregateInviteArgs,
    Client.Prisma.GetInviteAggregateType<AggregateInviteArgs>
  >
  groupByInvite?: Resolver<
    {},
    GroupByInviteArgs,
    Client.Prisma.InviteGroupByOutputType[]
  >
  findUniqueInvite?: Resolver<{}, FindUniqueInviteArgs, Client.Invite | null>
  findFirstRole?: Resolver<{}, FindFirstRoleArgs, Client.Role | null>
  findManyRole?: Resolver<{}, FindManyRoleArgs, Client.Role[]>
  findManyRoleCount?: Resolver<{}, FindManyRoleArgs, number>
  aggregateRole?: Resolver<
    {},
    AggregateRoleArgs,
    Client.Prisma.GetRoleAggregateType<AggregateRoleArgs>
  >
  groupByRole?: Resolver<
    {},
    GroupByRoleArgs,
    Client.Prisma.RoleGroupByOutputType[]
  >
  findUniqueRole?: Resolver<{}, FindUniqueRoleArgs, Client.Role | null>
  findFirstProjectedRevenue?: Resolver<
    {},
    FindFirstProjectedRevenueArgs,
    Client.ProjectedRevenue | null
  >
  findManyProjectedRevenue?: Resolver<
    {},
    FindManyProjectedRevenueArgs,
    Client.ProjectedRevenue[]
  >
  findManyProjectedRevenueCount?: Resolver<
    {},
    FindManyProjectedRevenueArgs,
    number
  >
  aggregateProjectedRevenue?: Resolver<
    {},
    AggregateProjectedRevenueArgs,
    Client.Prisma.GetProjectedRevenueAggregateType<AggregateProjectedRevenueArgs>
  >
  groupByProjectedRevenue?: Resolver<
    {},
    GroupByProjectedRevenueArgs,
    Client.Prisma.ProjectedRevenueGroupByOutputType[]
  >
  findUniqueProjectedRevenue?: Resolver<
    {},
    FindUniqueProjectedRevenueArgs,
    Client.ProjectedRevenue | null
  >
  findFirstProjectedExpenses?: Resolver<
    {},
    FindFirstProjectedExpensesArgs,
    Client.ProjectedExpenses | null
  >
  findManyProjectedExpenses?: Resolver<
    {},
    FindManyProjectedExpensesArgs,
    Client.ProjectedExpenses[]
  >
  findManyProjectedExpensesCount?: Resolver<
    {},
    FindManyProjectedExpensesArgs,
    number
  >
  aggregateProjectedExpenses?: Resolver<
    {},
    AggregateProjectedExpensesArgs,
    Client.Prisma.GetProjectedExpensesAggregateType<AggregateProjectedExpensesArgs>
  >
  groupByProjectedExpenses?: Resolver<
    {},
    GroupByProjectedExpensesArgs,
    Client.Prisma.ProjectedExpensesGroupByOutputType[]
  >
  findUniqueProjectedExpenses?: Resolver<
    {},
    FindUniqueProjectedExpensesArgs,
    Client.ProjectedExpenses | null
  >
}

export interface Mutation {
  [key: string]: Resolver<any, any, any>
  createOneClub?: Resolver<{}, CreateOneClubArgs, Client.Club>
  upsertOneClub?: Resolver<{}, UpsertOneClubArgs, Client.Club>
  deleteOneClub?: Resolver<{}, DeleteOneClubArgs, Client.Club | null>
  updateOneClub?: Resolver<{}, UpdateOneClubArgs, Client.Club | null>
  updateManyClub?: Resolver<{}, UpdateManyClubArgs, Client.Prisma.BatchPayload>
  deleteManyClub?: Resolver<{}, DeleteManyClubArgs, Client.Prisma.BatchPayload>
  createOneLink?: Resolver<{}, CreateOneLinkArgs, Client.Link>
  upsertOneLink?: Resolver<{}, UpsertOneLinkArgs, Client.Link>
  deleteOneLink?: Resolver<{}, DeleteOneLinkArgs, Client.Link | null>
  updateOneLink?: Resolver<{}, UpdateOneLinkArgs, Client.Link | null>
  updateManyLink?: Resolver<{}, UpdateManyLinkArgs, Client.Prisma.BatchPayload>
  deleteManyLink?: Resolver<{}, DeleteManyLinkArgs, Client.Prisma.BatchPayload>
  createOneClubApplicationInfo?: Resolver<
    {},
    CreateOneClubApplicationInfoArgs,
    Client.ClubApplicationInfo
  >
  upsertOneClubApplicationInfo?: Resolver<
    {},
    UpsertOneClubApplicationInfoArgs,
    Client.ClubApplicationInfo
  >
  deleteOneClubApplicationInfo?: Resolver<
    {},
    DeleteOneClubApplicationInfoArgs,
    Client.ClubApplicationInfo | null
  >
  updateOneClubApplicationInfo?: Resolver<
    {},
    UpdateOneClubApplicationInfoArgs,
    Client.ClubApplicationInfo | null
  >
  updateManyClubApplicationInfo?: Resolver<
    {},
    UpdateManyClubApplicationInfoArgs,
    Client.Prisma.BatchPayload
  >
  deleteManyClubApplicationInfo?: Resolver<
    {},
    DeleteManyClubApplicationInfoArgs,
    Client.Prisma.BatchPayload
  >
  createOneTag?: Resolver<{}, CreateOneTagArgs, Client.Tag>
  upsertOneTag?: Resolver<{}, UpsertOneTagArgs, Client.Tag>
  deleteOneTag?: Resolver<{}, DeleteOneTagArgs, Client.Tag | null>
  updateOneTag?: Resolver<{}, UpdateOneTagArgs, Client.Tag | null>
  updateManyTag?: Resolver<{}, UpdateManyTagArgs, Client.Prisma.BatchPayload>
  deleteManyTag?: Resolver<{}, DeleteManyTagArgs, Client.Prisma.BatchPayload>
  createOneUser?: Resolver<{}, CreateOneUserArgs, Client.User>
  upsertOneUser?: Resolver<{}, UpsertOneUserArgs, Client.User>
  deleteOneUser?: Resolver<{}, DeleteOneUserArgs, Client.User | null>
  updateOneUser?: Resolver<{}, UpdateOneUserArgs, Client.User | null>
  updateManyUser?: Resolver<{}, UpdateManyUserArgs, Client.Prisma.BatchPayload>
  deleteManyUser?: Resolver<{}, DeleteManyUserArgs, Client.Prisma.BatchPayload>
  createOneInvite?: Resolver<{}, CreateOneInviteArgs, Client.Invite>
  upsertOneInvite?: Resolver<{}, UpsertOneInviteArgs, Client.Invite>
  deleteOneInvite?: Resolver<{}, DeleteOneInviteArgs, Client.Invite | null>
  updateOneInvite?: Resolver<{}, UpdateOneInviteArgs, Client.Invite | null>
  updateManyInvite?: Resolver<
    {},
    UpdateManyInviteArgs,
    Client.Prisma.BatchPayload
  >
  deleteManyInvite?: Resolver<
    {},
    DeleteManyInviteArgs,
    Client.Prisma.BatchPayload
  >
  createOneRole?: Resolver<{}, CreateOneRoleArgs, Client.Role>
  upsertOneRole?: Resolver<{}, UpsertOneRoleArgs, Client.Role>
  deleteOneRole?: Resolver<{}, DeleteOneRoleArgs, Client.Role | null>
  updateOneRole?: Resolver<{}, UpdateOneRoleArgs, Client.Role | null>
  updateManyRole?: Resolver<{}, UpdateManyRoleArgs, Client.Prisma.BatchPayload>
  deleteManyRole?: Resolver<{}, DeleteManyRoleArgs, Client.Prisma.BatchPayload>
  createOneProjectedRevenue?: Resolver<
    {},
    CreateOneProjectedRevenueArgs,
    Client.ProjectedRevenue
  >
  upsertOneProjectedRevenue?: Resolver<
    {},
    UpsertOneProjectedRevenueArgs,
    Client.ProjectedRevenue
  >
  deleteOneProjectedRevenue?: Resolver<
    {},
    DeleteOneProjectedRevenueArgs,
    Client.ProjectedRevenue | null
  >
  updateOneProjectedRevenue?: Resolver<
    {},
    UpdateOneProjectedRevenueArgs,
    Client.ProjectedRevenue | null
  >
  updateManyProjectedRevenue?: Resolver<
    {},
    UpdateManyProjectedRevenueArgs,
    Client.Prisma.BatchPayload
  >
  deleteManyProjectedRevenue?: Resolver<
    {},
    DeleteManyProjectedRevenueArgs,
    Client.Prisma.BatchPayload
  >
  createOneProjectedExpenses?: Resolver<
    {},
    CreateOneProjectedExpensesArgs,
    Client.ProjectedExpenses
  >
  upsertOneProjectedExpenses?: Resolver<
    {},
    UpsertOneProjectedExpensesArgs,
    Client.ProjectedExpenses
  >
  deleteOneProjectedExpenses?: Resolver<
    {},
    DeleteOneProjectedExpensesArgs,
    Client.ProjectedExpenses | null
  >
  updateOneProjectedExpenses?: Resolver<
    {},
    UpdateOneProjectedExpensesArgs,
    Client.ProjectedExpenses | null
  >
  updateManyProjectedExpenses?: Resolver<
    {},
    UpdateManyProjectedExpensesArgs,
    Client.Prisma.BatchPayload
  >
  deleteManyProjectedExpenses?: Resolver<
    {},
    DeleteManyProjectedExpensesArgs,
    Client.Prisma.BatchPayload
  >
  executeRaw?: Resolver<{}, ExecuteRawArgs, any>
  queryRaw?: Resolver<{}, QueryRawArgs, any>
}

export interface AggregateClub {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateClub,
    {},
    Client.Prisma.ClubCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateClub,
    {},
    Client.Prisma.ClubAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateClub,
    {},
    Client.Prisma.ClubSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateClub,
    {},
    Client.Prisma.ClubMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateClub,
    {},
    Client.Prisma.ClubMaxAggregateOutputType | null
  >
}

export interface ClubGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, number>
  name?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  slug?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  description?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  email?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  meetingDate?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  location?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  approval?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  status?: Resolver<Client.Prisma.ClubGroupByOutputType, {}, string | null>
  availability?: Resolver<
    Client.Prisma.ClubGroupByOutputType,
    {},
    string | null
  >
  _count?: Resolver<
    Client.Prisma.ClubGroupByOutputType,
    {},
    Client.Prisma.ClubCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.ClubGroupByOutputType,
    {},
    Client.Prisma.ClubAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.ClubGroupByOutputType,
    {},
    Client.Prisma.ClubSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.ClubGroupByOutputType,
    {},
    Client.Prisma.ClubMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.ClubGroupByOutputType,
    {},
    Client.Prisma.ClubMaxAggregateOutputType | null
  >
}

export interface AggregateLink {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateLink,
    {},
    Client.Prisma.LinkCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateLink,
    {},
    Client.Prisma.LinkAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateLink,
    {},
    Client.Prisma.LinkSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateLink,
    {},
    Client.Prisma.LinkMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateLink,
    {},
    Client.Prisma.LinkMaxAggregateOutputType | null
  >
}

export interface LinkGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.LinkGroupByOutputType, {}, number>
  clubId?: Resolver<Client.Prisma.LinkGroupByOutputType, {}, number>
  name?: Resolver<Client.Prisma.LinkGroupByOutputType, {}, string | null>
  link?: Resolver<Client.Prisma.LinkGroupByOutputType, {}, string>
  type?: Resolver<Client.Prisma.LinkGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.LinkGroupByOutputType,
    {},
    Client.Prisma.LinkCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.LinkGroupByOutputType,
    {},
    Client.Prisma.LinkAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.LinkGroupByOutputType,
    {},
    Client.Prisma.LinkSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.LinkGroupByOutputType,
    {},
    Client.Prisma.LinkMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.LinkGroupByOutputType,
    {},
    Client.Prisma.LinkMaxAggregateOutputType | null
  >
}

export interface AggregateClubApplicationInfo {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateClubApplicationInfo,
    {},
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateClubApplicationInfo,
    {},
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateClubApplicationInfo,
    {},
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateClubApplicationInfo,
    {},
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateClubApplicationInfo,
    {},
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType | null
  >
}

export interface ClubApplicationInfoGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubApplicationInfoGroupByOutputType, {}, number>
  userId?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    number
  >
  clubId?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    number
  >
  purpose?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    string
  >
  membershipRequirements?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    string
  >
  dutiesOfMembers?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    string
  >
  titlesAndDutiesOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    string
  >
  selectionOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    string
  >
  officerMinimumGPA?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    number
  >
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    number
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    number
  >
  _count?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.ClubApplicationInfoGroupByOutputType,
    {},
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType | null
  >
}

export interface AggregateTag {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateTag,
    {},
    Client.Prisma.TagCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateTag,
    {},
    Client.Prisma.TagAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateTag,
    {},
    Client.Prisma.TagSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateTag,
    {},
    Client.Prisma.TagMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateTag,
    {},
    Client.Prisma.TagMaxAggregateOutputType | null
  >
}

export interface TagGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.TagGroupByOutputType, {}, number>
  name?: Resolver<Client.Prisma.TagGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.TagGroupByOutputType,
    {},
    Client.Prisma.TagCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.TagGroupByOutputType,
    {},
    Client.Prisma.TagAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.TagGroupByOutputType,
    {},
    Client.Prisma.TagSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.TagGroupByOutputType,
    {},
    Client.Prisma.TagMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.TagGroupByOutputType,
    {},
    Client.Prisma.TagMaxAggregateOutputType | null
  >
}

export interface AggregateUser {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserMaxAggregateOutputType | null
  >
}

export interface UserGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserGroupByOutputType, {}, number>
  ccid?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  firstname?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  lastname?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  email?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  emailVerified?: Resolver<Client.Prisma.UserGroupByOutputType, {}, boolean>
  password?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  grade?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  type?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserMaxAggregateOutputType | null
  >
}

export interface AggregateInvite {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateInvite,
    {},
    Client.Prisma.InviteCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateInvite,
    {},
    Client.Prisma.InviteAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateInvite,
    {},
    Client.Prisma.InviteSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateInvite,
    {},
    Client.Prisma.InviteMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateInvite,
    {},
    Client.Prisma.InviteMaxAggregateOutputType | null
  >
}

export interface InviteGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.InviteGroupByOutputType, {}, number>
  status?: Resolver<Client.Prisma.InviteGroupByOutputType, {}, string>
  clubId?: Resolver<Client.Prisma.InviteGroupByOutputType, {}, number>
  userId?: Resolver<Client.Prisma.InviteGroupByOutputType, {}, number>
  _count?: Resolver<
    Client.Prisma.InviteGroupByOutputType,
    {},
    Client.Prisma.InviteCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.InviteGroupByOutputType,
    {},
    Client.Prisma.InviteAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.InviteGroupByOutputType,
    {},
    Client.Prisma.InviteSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.InviteGroupByOutputType,
    {},
    Client.Prisma.InviteMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.InviteGroupByOutputType,
    {},
    Client.Prisma.InviteMaxAggregateOutputType | null
  >
}

export interface AggregateRole {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateRole,
    {},
    Client.Prisma.RoleCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateRole,
    {},
    Client.Prisma.RoleAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateRole,
    {},
    Client.Prisma.RoleSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateRole,
    {},
    Client.Prisma.RoleMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateRole,
    {},
    Client.Prisma.RoleMaxAggregateOutputType | null
  >
}

export interface RoleGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.RoleGroupByOutputType, {}, number>
  name?: Resolver<Client.Prisma.RoleGroupByOutputType, {}, string>
  color?: Resolver<Client.Prisma.RoleGroupByOutputType, {}, string>
  description?: Resolver<Client.Prisma.RoleGroupByOutputType, {}, string>
  clubId?: Resolver<Client.Prisma.RoleGroupByOutputType, {}, number>
  type?: Resolver<Client.Prisma.RoleGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.RoleGroupByOutputType,
    {},
    Client.Prisma.RoleCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.RoleGroupByOutputType,
    {},
    Client.Prisma.RoleAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.RoleGroupByOutputType,
    {},
    Client.Prisma.RoleSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.RoleGroupByOutputType,
    {},
    Client.Prisma.RoleMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.RoleGroupByOutputType,
    {},
    Client.Prisma.RoleMaxAggregateOutputType | null
  >
}

export interface AggregateProjectedRevenue {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateProjectedRevenue,
    {},
    Client.Prisma.ProjectedRevenueCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateProjectedRevenue,
    {},
    Client.Prisma.ProjectedRevenueAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateProjectedRevenue,
    {},
    Client.Prisma.ProjectedRevenueSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateProjectedRevenue,
    {},
    Client.Prisma.ProjectedRevenueMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateProjectedRevenue,
    {},
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType | null
  >
}

export interface ProjectedRevenueGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ProjectedRevenueGroupByOutputType, {}, number>
  clubId?: Resolver<Client.Prisma.ProjectedRevenueGroupByOutputType, {}, number>
  name?: Resolver<Client.Prisma.ProjectedRevenueGroupByOutputType, {}, string>
  amount?: Resolver<Client.Prisma.ProjectedRevenueGroupByOutputType, {}, number>
  date?: Resolver<Client.Prisma.ProjectedRevenueGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.ProjectedRevenueGroupByOutputType,
    {},
    Client.Prisma.ProjectedRevenueCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.ProjectedRevenueGroupByOutputType,
    {},
    Client.Prisma.ProjectedRevenueAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.ProjectedRevenueGroupByOutputType,
    {},
    Client.Prisma.ProjectedRevenueSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.ProjectedRevenueGroupByOutputType,
    {},
    Client.Prisma.ProjectedRevenueMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.ProjectedRevenueGroupByOutputType,
    {},
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType | null
  >
}

export interface AggregateProjectedExpenses {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateProjectedExpenses,
    {},
    Client.Prisma.ProjectedExpensesCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.AggregateProjectedExpenses,
    {},
    Client.Prisma.ProjectedExpensesAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.AggregateProjectedExpenses,
    {},
    Client.Prisma.ProjectedExpensesSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateProjectedExpenses,
    {},
    Client.Prisma.ProjectedExpensesMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateProjectedExpenses,
    {},
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType | null
  >
}

export interface ProjectedExpensesGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ProjectedExpensesGroupByOutputType, {}, number>
  clubId?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    number
  >
  name?: Resolver<Client.Prisma.ProjectedExpensesGroupByOutputType, {}, string>
  amount?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    number
  >
  date?: Resolver<Client.Prisma.ProjectedExpensesGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    Client.Prisma.ProjectedExpensesCountAggregateOutputType | null
  >
  _avg?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    Client.Prisma.ProjectedExpensesAvgAggregateOutputType | null
  >
  _sum?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    Client.Prisma.ProjectedExpensesSumAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    Client.Prisma.ProjectedExpensesMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.ProjectedExpensesGroupByOutputType,
    {},
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType | null
  >
}

export interface AffectedRowsOutput {
  [key: string]: Resolver<any, any, any>
  count?: Resolver<Client.Prisma.BatchPayload, {}, number>
}

export interface ClubCountOutputType {
  [key: string]: Resolver<any, any, any>
  links?: Resolver<Client.Prisma.ClubCountOutputType, {}, number>
  tags?: Resolver<Client.Prisma.ClubCountOutputType, {}, number>
  members?: Resolver<Client.Prisma.ClubCountOutputType, {}, number>
  editors?: Resolver<Client.Prisma.ClubCountOutputType, {}, number>
  roles?: Resolver<Client.Prisma.ClubCountOutputType, {}, number>
  invites?: Resolver<Client.Prisma.ClubCountOutputType, {}, number>
}

export interface ClubCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  name?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  slug?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  description?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  email?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  meetingDate?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  location?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  approval?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  status?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
  availability?: Resolver<
    Client.Prisma.ClubCountAggregateOutputType,
    {},
    number
  >
  _all?: Resolver<Client.Prisma.ClubCountAggregateOutputType, {}, number>
}

export interface ClubAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubAvgAggregateOutputType, {}, number | null>
}

export interface ClubSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubSumAggregateOutputType, {}, number | null>
}

export interface ClubMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubMinAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.ClubMinAggregateOutputType, {}, string | null>
  slug?: Resolver<Client.Prisma.ClubMinAggregateOutputType, {}, string | null>
  description?: Resolver<
    Client.Prisma.ClubMinAggregateOutputType,
    {},
    string | null
  >
  email?: Resolver<Client.Prisma.ClubMinAggregateOutputType, {}, string | null>
  meetingDate?: Resolver<
    Client.Prisma.ClubMinAggregateOutputType,
    {},
    string | null
  >
  location?: Resolver<
    Client.Prisma.ClubMinAggregateOutputType,
    {},
    string | null
  >
  approval?: Resolver<
    Client.Prisma.ClubMinAggregateOutputType,
    {},
    string | null
  >
  status?: Resolver<Client.Prisma.ClubMinAggregateOutputType, {}, string | null>
  availability?: Resolver<
    Client.Prisma.ClubMinAggregateOutputType,
    {},
    string | null
  >
}

export interface ClubMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.ClubMaxAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.ClubMaxAggregateOutputType, {}, string | null>
  slug?: Resolver<Client.Prisma.ClubMaxAggregateOutputType, {}, string | null>
  description?: Resolver<
    Client.Prisma.ClubMaxAggregateOutputType,
    {},
    string | null
  >
  email?: Resolver<Client.Prisma.ClubMaxAggregateOutputType, {}, string | null>
  meetingDate?: Resolver<
    Client.Prisma.ClubMaxAggregateOutputType,
    {},
    string | null
  >
  location?: Resolver<
    Client.Prisma.ClubMaxAggregateOutputType,
    {},
    string | null
  >
  approval?: Resolver<
    Client.Prisma.ClubMaxAggregateOutputType,
    {},
    string | null
  >
  status?: Resolver<Client.Prisma.ClubMaxAggregateOutputType, {}, string | null>
  availability?: Resolver<
    Client.Prisma.ClubMaxAggregateOutputType,
    {},
    string | null
  >
}

export interface LinkCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.LinkCountAggregateOutputType, {}, number>
  clubId?: Resolver<Client.Prisma.LinkCountAggregateOutputType, {}, number>
  name?: Resolver<Client.Prisma.LinkCountAggregateOutputType, {}, number>
  link?: Resolver<Client.Prisma.LinkCountAggregateOutputType, {}, number>
  type?: Resolver<Client.Prisma.LinkCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.LinkCountAggregateOutputType, {}, number>
}

export interface LinkAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.LinkAvgAggregateOutputType, {}, number | null>
  clubId?: Resolver<Client.Prisma.LinkAvgAggregateOutputType, {}, number | null>
}

export interface LinkSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.LinkSumAggregateOutputType, {}, number | null>
  clubId?: Resolver<Client.Prisma.LinkSumAggregateOutputType, {}, number | null>
}

export interface LinkMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.LinkMinAggregateOutputType, {}, number | null>
  clubId?: Resolver<Client.Prisma.LinkMinAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.LinkMinAggregateOutputType, {}, string | null>
  link?: Resolver<Client.Prisma.LinkMinAggregateOutputType, {}, string | null>
  type?: Resolver<Client.Prisma.LinkMinAggregateOutputType, {}, string | null>
}

export interface LinkMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.LinkMaxAggregateOutputType, {}, number | null>
  clubId?: Resolver<Client.Prisma.LinkMaxAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.LinkMaxAggregateOutputType, {}, string | null>
  link?: Resolver<Client.Prisma.LinkMaxAggregateOutputType, {}, string | null>
  type?: Resolver<Client.Prisma.LinkMaxAggregateOutputType, {}, string | null>
}

export interface ClubApplicationInfoCountOutputType {
  [key: string]: Resolver<any, any, any>
  projectedRevenue?: Resolver<
    Client.Prisma.ClubApplicationInfoCountOutputType,
    {},
    number
  >
  projectedExpenses?: Resolver<
    Client.Prisma.ClubApplicationInfoCountOutputType,
    {},
    number
  >
}

export interface ClubApplicationInfoCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  userId?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  clubId?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  purpose?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  membershipRequirements?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  dutiesOfMembers?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  titlesAndDutiesOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  selectionOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  officerMinimumGPA?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
  _all?: Resolver<
    Client.Prisma.ClubApplicationInfoCountAggregateOutputType,
    {},
    number
  >
}

export interface ClubApplicationInfoAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType,
    {},
    number | null
  >
  officerMinimumGPA?: Resolver<
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.Prisma.ClubApplicationInfoAvgAggregateOutputType,
    {},
    number | null
  >
}

export interface ClubApplicationInfoSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType,
    {},
    number | null
  >
  officerMinimumGPA?: Resolver<
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.Prisma.ClubApplicationInfoSumAggregateOutputType,
    {},
    number | null
  >
}

export interface ClubApplicationInfoMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    number | null
  >
  purpose?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    string | null
  >
  membershipRequirements?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    string | null
  >
  dutiesOfMembers?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    string | null
  >
  titlesAndDutiesOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    string | null
  >
  selectionOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    string | null
  >
  officerMinimumGPA?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.Prisma.ClubApplicationInfoMinAggregateOutputType,
    {},
    number | null
  >
}

export interface ClubApplicationInfoMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    number | null
  >
  purpose?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    string | null
  >
  membershipRequirements?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    string | null
  >
  dutiesOfMembers?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    string | null
  >
  titlesAndDutiesOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    string | null
  >
  selectionOfOfficers?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    string | null
  >
  officerMinimumGPA?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceForOfficialMeeting?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    number | null
  >
  percentAttendanceToApproveDecision?: Resolver<
    Client.Prisma.ClubApplicationInfoMaxAggregateOutputType,
    {},
    number | null
  >
}

export interface TagCountOutputType {
  [key: string]: Resolver<any, any, any>
  clubs?: Resolver<Client.Prisma.TagCountOutputType, {}, number>
  interestedUsers?: Resolver<Client.Prisma.TagCountOutputType, {}, number>
}

export interface TagCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.TagCountAggregateOutputType, {}, number>
  name?: Resolver<Client.Prisma.TagCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.TagCountAggregateOutputType, {}, number>
}

export interface TagAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.TagAvgAggregateOutputType, {}, number | null>
}

export interface TagSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.TagSumAggregateOutputType, {}, number | null>
}

export interface TagMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.TagMinAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.TagMinAggregateOutputType, {}, string | null>
}

export interface TagMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.TagMaxAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.TagMaxAggregateOutputType, {}, string | null>
}

export interface UserCountOutputType {
  [key: string]: Resolver<any, any, any>
  interests?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
  clubs?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
  canEdit?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
  advisor?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
  roles?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
  invites?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
}

export interface UserCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  ccid?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  firstname?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  lastname?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  email?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  emailVerified?: Resolver<
    Client.Prisma.UserCountAggregateOutputType,
    {},
    number
  >
  password?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  grade?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  type?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
}

export interface UserAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserAvgAggregateOutputType, {}, number | null>
}

export interface UserSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserSumAggregateOutputType, {}, number | null>
}

export interface UserMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, number | null>
  ccid?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  firstname?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
  lastname?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
  email?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  emailVerified?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    boolean | null
  >
  password?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
  grade?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  type?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
}

export interface UserMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, number | null>
  ccid?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  firstname?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
  lastname?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
  email?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  emailVerified?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    boolean | null
  >
  password?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
  grade?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  type?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
}

export interface InviteCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.InviteCountAggregateOutputType, {}, number>
  status?: Resolver<Client.Prisma.InviteCountAggregateOutputType, {}, number>
  clubId?: Resolver<Client.Prisma.InviteCountAggregateOutputType, {}, number>
  userId?: Resolver<Client.Prisma.InviteCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.InviteCountAggregateOutputType, {}, number>
}

export interface InviteAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.InviteAvgAggregateOutputType, {}, number | null>
  clubId?: Resolver<
    Client.Prisma.InviteAvgAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.InviteAvgAggregateOutputType,
    {},
    number | null
  >
}

export interface InviteSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.InviteSumAggregateOutputType, {}, number | null>
  clubId?: Resolver<
    Client.Prisma.InviteSumAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.InviteSumAggregateOutputType,
    {},
    number | null
  >
}

export interface InviteMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.InviteMinAggregateOutputType, {}, number | null>
  status?: Resolver<
    Client.Prisma.InviteMinAggregateOutputType,
    {},
    string | null
  >
  clubId?: Resolver<
    Client.Prisma.InviteMinAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.InviteMinAggregateOutputType,
    {},
    number | null
  >
}

export interface InviteMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.InviteMaxAggregateOutputType, {}, number | null>
  status?: Resolver<
    Client.Prisma.InviteMaxAggregateOutputType,
    {},
    string | null
  >
  clubId?: Resolver<
    Client.Prisma.InviteMaxAggregateOutputType,
    {},
    number | null
  >
  userId?: Resolver<
    Client.Prisma.InviteMaxAggregateOutputType,
    {},
    number | null
  >
}

export interface RoleCountOutputType {
  [key: string]: Resolver<any, any, any>
  users?: Resolver<Client.Prisma.RoleCountOutputType, {}, number>
}

export interface RoleCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
  name?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
  color?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
  description?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
  clubId?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
  type?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.RoleCountAggregateOutputType, {}, number>
}

export interface RoleAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.RoleAvgAggregateOutputType, {}, number | null>
  clubId?: Resolver<Client.Prisma.RoleAvgAggregateOutputType, {}, number | null>
}

export interface RoleSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.RoleSumAggregateOutputType, {}, number | null>
  clubId?: Resolver<Client.Prisma.RoleSumAggregateOutputType, {}, number | null>
}

export interface RoleMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.RoleMinAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.RoleMinAggregateOutputType, {}, string | null>
  color?: Resolver<Client.Prisma.RoleMinAggregateOutputType, {}, string | null>
  description?: Resolver<
    Client.Prisma.RoleMinAggregateOutputType,
    {},
    string | null
  >
  clubId?: Resolver<Client.Prisma.RoleMinAggregateOutputType, {}, number | null>
  type?: Resolver<Client.Prisma.RoleMinAggregateOutputType, {}, string | null>
}

export interface RoleMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.RoleMaxAggregateOutputType, {}, number | null>
  name?: Resolver<Client.Prisma.RoleMaxAggregateOutputType, {}, string | null>
  color?: Resolver<Client.Prisma.RoleMaxAggregateOutputType, {}, string | null>
  description?: Resolver<
    Client.Prisma.RoleMaxAggregateOutputType,
    {},
    string | null
  >
  clubId?: Resolver<Client.Prisma.RoleMaxAggregateOutputType, {}, number | null>
  type?: Resolver<Client.Prisma.RoleMaxAggregateOutputType, {}, string | null>
}

export interface ProjectedRevenueCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedRevenueCountAggregateOutputType,
    {},
    number
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedRevenueCountAggregateOutputType,
    {},
    number
  >
  name?: Resolver<
    Client.Prisma.ProjectedRevenueCountAggregateOutputType,
    {},
    number
  >
  amount?: Resolver<
    Client.Prisma.ProjectedRevenueCountAggregateOutputType,
    {},
    number
  >
  date?: Resolver<
    Client.Prisma.ProjectedRevenueCountAggregateOutputType,
    {},
    number
  >
  _all?: Resolver<
    Client.Prisma.ProjectedRevenueCountAggregateOutputType,
    {},
    number
  >
}

export interface ProjectedRevenueAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedRevenueAvgAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedRevenueAvgAggregateOutputType,
    {},
    number | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedRevenueAvgAggregateOutputType,
    {},
    number | null
  >
}

export interface ProjectedRevenueSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedRevenueSumAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedRevenueSumAggregateOutputType,
    {},
    number | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedRevenueSumAggregateOutputType,
    {},
    number | null
  >
}

export interface ProjectedRevenueMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedRevenueMinAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedRevenueMinAggregateOutputType,
    {},
    number | null
  >
  name?: Resolver<
    Client.Prisma.ProjectedRevenueMinAggregateOutputType,
    {},
    string | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedRevenueMinAggregateOutputType,
    {},
    number | null
  >
  date?: Resolver<
    Client.Prisma.ProjectedRevenueMinAggregateOutputType,
    {},
    string | null
  >
}

export interface ProjectedRevenueMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType,
    {},
    number | null
  >
  name?: Resolver<
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType,
    {},
    string | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType,
    {},
    number | null
  >
  date?: Resolver<
    Client.Prisma.ProjectedRevenueMaxAggregateOutputType,
    {},
    string | null
  >
}

export interface ProjectedExpensesCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedExpensesCountAggregateOutputType,
    {},
    number
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedExpensesCountAggregateOutputType,
    {},
    number
  >
  name?: Resolver<
    Client.Prisma.ProjectedExpensesCountAggregateOutputType,
    {},
    number
  >
  amount?: Resolver<
    Client.Prisma.ProjectedExpensesCountAggregateOutputType,
    {},
    number
  >
  date?: Resolver<
    Client.Prisma.ProjectedExpensesCountAggregateOutputType,
    {},
    number
  >
  _all?: Resolver<
    Client.Prisma.ProjectedExpensesCountAggregateOutputType,
    {},
    number
  >
}

export interface ProjectedExpensesAvgAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedExpensesAvgAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedExpensesAvgAggregateOutputType,
    {},
    number | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedExpensesAvgAggregateOutputType,
    {},
    number | null
  >
}

export interface ProjectedExpensesSumAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedExpensesSumAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedExpensesSumAggregateOutputType,
    {},
    number | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedExpensesSumAggregateOutputType,
    {},
    number | null
  >
}

export interface ProjectedExpensesMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedExpensesMinAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedExpensesMinAggregateOutputType,
    {},
    number | null
  >
  name?: Resolver<
    Client.Prisma.ProjectedExpensesMinAggregateOutputType,
    {},
    string | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedExpensesMinAggregateOutputType,
    {},
    number | null
  >
  date?: Resolver<
    Client.Prisma.ProjectedExpensesMinAggregateOutputType,
    {},
    string | null
  >
}

export interface ProjectedExpensesMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType,
    {},
    number | null
  >
  clubId?: Resolver<
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType,
    {},
    number | null
  >
  name?: Resolver<
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType,
    {},
    string | null
  >
  amount?: Resolver<
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType,
    {},
    number | null
  >
  date?: Resolver<
    Client.Prisma.ProjectedExpensesMaxAggregateOutputType,
    {},
    string | null
  >
}

export interface ClubLinksArgs {
  where?: LinkWhereInput | null
  orderBy?: LinkOrderByWithRelationInput[] | null
  cursor?: LinkWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: LinkScalarFieldEnum[] | null
}

export interface ClubTagsArgs {
  where?: TagWhereInput | null
  orderBy?: TagOrderByWithRelationInput[] | null
  cursor?: TagWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: TagScalarFieldEnum[] | null
}

export interface ClubMembersArgs {
  where?: UserWhereInput | null
  orderBy?: UserOrderByWithRelationInput[] | null
  cursor?: UserWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: UserScalarFieldEnum[] | null
}

export interface ClubEditorsArgs {
  where?: UserWhereInput | null
  orderBy?: UserOrderByWithRelationInput[] | null
  cursor?: UserWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: UserScalarFieldEnum[] | null
}

export interface ClubRolesArgs {
  where?: RoleWhereInput | null
  orderBy?: RoleOrderByWithRelationInput[] | null
  cursor?: RoleWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: RoleScalarFieldEnum[] | null
}

export interface ClubInvitesArgs {
  where?: InviteWhereInput | null
  orderBy?: InviteOrderByWithRelationInput[] | null
  cursor?: InviteWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: InviteScalarFieldEnum[] | null
}

export interface ClubApplicationInfoProjectedRevenueArgs {
  where?: ProjectedRevenueWhereInput | null
  orderBy?: ProjectedRevenueOrderByWithRelationInput[] | null
  cursor?: ProjectedRevenueWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ProjectedRevenueScalarFieldEnum[] | null
}

export interface ClubApplicationInfoProjectedExpensesArgs {
  where?: ProjectedExpensesWhereInput | null
  orderBy?: ProjectedExpensesOrderByWithRelationInput[] | null
  cursor?: ProjectedExpensesWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ProjectedExpensesScalarFieldEnum[] | null
}

export interface TagClubsArgs {
  where?: ClubWhereInput | null
  orderBy?: ClubOrderByWithRelationInput[] | null
  cursor?: ClubWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ClubScalarFieldEnum[] | null
}

export interface TagInterestedUsersArgs {
  where?: UserWhereInput | null
  orderBy?: UserOrderByWithRelationInput[] | null
  cursor?: UserWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: UserScalarFieldEnum[] | null
}

export interface UserInterestsArgs {
  where?: TagWhereInput | null
  orderBy?: TagOrderByWithRelationInput[] | null
  cursor?: TagWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: TagScalarFieldEnum[] | null
}

export interface UserClubsArgs {
  where?: ClubWhereInput | null
  orderBy?: ClubOrderByWithRelationInput[] | null
  cursor?: ClubWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ClubScalarFieldEnum[] | null
}

export interface UserCanEditArgs {
  where?: ClubWhereInput | null
  orderBy?: ClubOrderByWithRelationInput[] | null
  cursor?: ClubWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ClubScalarFieldEnum[] | null
}

export interface UserAdvisorArgs {
  where?: ClubApplicationInfoWhereInput | null
  orderBy?: ClubApplicationInfoOrderByWithRelationInput[] | null
  cursor?: ClubApplicationInfoWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ClubApplicationInfoScalarFieldEnum[] | null
}

export interface UserRolesArgs {
  where?: RoleWhereInput | null
  orderBy?: RoleOrderByWithRelationInput[] | null
  cursor?: RoleWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: RoleScalarFieldEnum[] | null
}

export interface UserInvitesArgs {
  where?: InviteWhereInput | null
  orderBy?: InviteOrderByWithRelationInput[] | null
  cursor?: InviteWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: InviteScalarFieldEnum[] | null
}

export interface RoleUsersArgs {
  where?: UserWhereInput | null
  orderBy?: UserOrderByWithRelationInput[] | null
  cursor?: UserWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: UserScalarFieldEnum[] | null
}

export interface FindFirstClubArgs {
  where?: ClubWhereInput | null
  orderBy?: ClubOrderByWithRelationInput[] | null
  cursor?: ClubWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ClubScalarFieldEnum[] | null
}

export interface FindManyClubArgs {
  where?: ClubWhereInput
  orderBy?: ClubOrderByWithRelationInput[]
  cursor?: ClubWhereUniqueInput
  take?: number
  skip?: number
  distinct?: ClubScalarFieldEnum[]
}

export interface AggregateClubArgs {
  where?: ClubWhereInput
  orderBy?: ClubOrderByWithRelationInput[]
  cursor?: ClubWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.ClubCountAggregateInputType
  _avg?: Client.Prisma.ClubAvgAggregateInputType
  _sum?: Client.Prisma.ClubSumAggregateInputType
  _min?: Client.Prisma.ClubMinAggregateInputType
  _max?: Client.Prisma.ClubMaxAggregateInputType
}

export interface GroupByClubArgs {
  where?: ClubWhereInput
  orderBy?: ClubOrderByWithAggregationInput[]
  by: ClubScalarFieldEnum[]
  having?: ClubScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueClubArgs {
  where: ClubWhereUniqueInput | null
}

export interface FindFirstLinkArgs {
  where?: LinkWhereInput | null
  orderBy?: LinkOrderByWithRelationInput[] | null
  cursor?: LinkWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: LinkScalarFieldEnum[] | null
}

export interface FindManyLinkArgs {
  where?: LinkWhereInput
  orderBy?: LinkOrderByWithRelationInput[]
  cursor?: LinkWhereUniqueInput
  take?: number
  skip?: number
  distinct?: LinkScalarFieldEnum[]
}

export interface AggregateLinkArgs {
  where?: LinkWhereInput
  orderBy?: LinkOrderByWithRelationInput[]
  cursor?: LinkWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.LinkCountAggregateInputType
  _avg?: Client.Prisma.LinkAvgAggregateInputType
  _sum?: Client.Prisma.LinkSumAggregateInputType
  _min?: Client.Prisma.LinkMinAggregateInputType
  _max?: Client.Prisma.LinkMaxAggregateInputType
}

export interface GroupByLinkArgs {
  where?: LinkWhereInput
  orderBy?: LinkOrderByWithAggregationInput[]
  by: LinkScalarFieldEnum[]
  having?: LinkScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueLinkArgs {
  where: LinkWhereUniqueInput | null
}

export interface FindFirstClubApplicationInfoArgs {
  where?: ClubApplicationInfoWhereInput | null
  orderBy?: ClubApplicationInfoOrderByWithRelationInput[] | null
  cursor?: ClubApplicationInfoWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ClubApplicationInfoScalarFieldEnum[] | null
}

export interface FindManyClubApplicationInfoArgs {
  where?: ClubApplicationInfoWhereInput
  orderBy?: ClubApplicationInfoOrderByWithRelationInput[]
  cursor?: ClubApplicationInfoWhereUniqueInput
  take?: number
  skip?: number
  distinct?: ClubApplicationInfoScalarFieldEnum[]
}

export interface AggregateClubApplicationInfoArgs {
  where?: ClubApplicationInfoWhereInput
  orderBy?: ClubApplicationInfoOrderByWithRelationInput[]
  cursor?: ClubApplicationInfoWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.ClubApplicationInfoCountAggregateInputType
  _avg?: Client.Prisma.ClubApplicationInfoAvgAggregateInputType
  _sum?: Client.Prisma.ClubApplicationInfoSumAggregateInputType
  _min?: Client.Prisma.ClubApplicationInfoMinAggregateInputType
  _max?: Client.Prisma.ClubApplicationInfoMaxAggregateInputType
}

export interface GroupByClubApplicationInfoArgs {
  where?: ClubApplicationInfoWhereInput
  orderBy?: ClubApplicationInfoOrderByWithAggregationInput[]
  by: ClubApplicationInfoScalarFieldEnum[]
  having?: ClubApplicationInfoScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueClubApplicationInfoArgs {
  where: ClubApplicationInfoWhereUniqueInput | null
}

export interface FindFirstTagArgs {
  where?: TagWhereInput | null
  orderBy?: TagOrderByWithRelationInput[] | null
  cursor?: TagWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: TagScalarFieldEnum[] | null
}

export interface FindManyTagArgs {
  where?: TagWhereInput
  orderBy?: TagOrderByWithRelationInput[]
  cursor?: TagWhereUniqueInput
  take?: number
  skip?: number
  distinct?: TagScalarFieldEnum[]
}

export interface AggregateTagArgs {
  where?: TagWhereInput
  orderBy?: TagOrderByWithRelationInput[]
  cursor?: TagWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.TagCountAggregateInputType
  _avg?: Client.Prisma.TagAvgAggregateInputType
  _sum?: Client.Prisma.TagSumAggregateInputType
  _min?: Client.Prisma.TagMinAggregateInputType
  _max?: Client.Prisma.TagMaxAggregateInputType
}

export interface GroupByTagArgs {
  where?: TagWhereInput
  orderBy?: TagOrderByWithAggregationInput[]
  by: TagScalarFieldEnum[]
  having?: TagScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueTagArgs {
  where: TagWhereUniqueInput | null
}

export interface FindFirstUserArgs {
  where?: UserWhereInput | null
  orderBy?: UserOrderByWithRelationInput[] | null
  cursor?: UserWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: UserScalarFieldEnum[] | null
}

export interface FindManyUserArgs {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: UserScalarFieldEnum[]
}

export interface AggregateUserArgs {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.UserCountAggregateInputType
  _avg?: Client.Prisma.UserAvgAggregateInputType
  _sum?: Client.Prisma.UserSumAggregateInputType
  _min?: Client.Prisma.UserMinAggregateInputType
  _max?: Client.Prisma.UserMaxAggregateInputType
}

export interface GroupByUserArgs {
  where?: UserWhereInput
  orderBy?: UserOrderByWithAggregationInput[]
  by: UserScalarFieldEnum[]
  having?: UserScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueUserArgs {
  where: UserWhereUniqueInput | null
}

export interface FindFirstInviteArgs {
  where?: InviteWhereInput | null
  orderBy?: InviteOrderByWithRelationInput[] | null
  cursor?: InviteWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: InviteScalarFieldEnum[] | null
}

export interface FindManyInviteArgs {
  where?: InviteWhereInput
  orderBy?: InviteOrderByWithRelationInput[]
  cursor?: InviteWhereUniqueInput
  take?: number
  skip?: number
  distinct?: InviteScalarFieldEnum[]
}

export interface AggregateInviteArgs {
  where?: InviteWhereInput
  orderBy?: InviteOrderByWithRelationInput[]
  cursor?: InviteWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.InviteCountAggregateInputType
  _avg?: Client.Prisma.InviteAvgAggregateInputType
  _sum?: Client.Prisma.InviteSumAggregateInputType
  _min?: Client.Prisma.InviteMinAggregateInputType
  _max?: Client.Prisma.InviteMaxAggregateInputType
}

export interface GroupByInviteArgs {
  where?: InviteWhereInput
  orderBy?: InviteOrderByWithAggregationInput[]
  by: InviteScalarFieldEnum[]
  having?: InviteScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueInviteArgs {
  where: InviteWhereUniqueInput | null
}

export interface FindFirstRoleArgs {
  where?: RoleWhereInput | null
  orderBy?: RoleOrderByWithRelationInput[] | null
  cursor?: RoleWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: RoleScalarFieldEnum[] | null
}

export interface FindManyRoleArgs {
  where?: RoleWhereInput
  orderBy?: RoleOrderByWithRelationInput[]
  cursor?: RoleWhereUniqueInput
  take?: number
  skip?: number
  distinct?: RoleScalarFieldEnum[]
}

export interface AggregateRoleArgs {
  where?: RoleWhereInput
  orderBy?: RoleOrderByWithRelationInput[]
  cursor?: RoleWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.RoleCountAggregateInputType
  _avg?: Client.Prisma.RoleAvgAggregateInputType
  _sum?: Client.Prisma.RoleSumAggregateInputType
  _min?: Client.Prisma.RoleMinAggregateInputType
  _max?: Client.Prisma.RoleMaxAggregateInputType
}

export interface GroupByRoleArgs {
  where?: RoleWhereInput
  orderBy?: RoleOrderByWithAggregationInput[]
  by: RoleScalarFieldEnum[]
  having?: RoleScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueRoleArgs {
  where: RoleWhereUniqueInput | null
}

export interface FindFirstProjectedRevenueArgs {
  where?: ProjectedRevenueWhereInput | null
  orderBy?: ProjectedRevenueOrderByWithRelationInput[] | null
  cursor?: ProjectedRevenueWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ProjectedRevenueScalarFieldEnum[] | null
}

export interface FindManyProjectedRevenueArgs {
  where?: ProjectedRevenueWhereInput
  orderBy?: ProjectedRevenueOrderByWithRelationInput[]
  cursor?: ProjectedRevenueWhereUniqueInput
  take?: number
  skip?: number
  distinct?: ProjectedRevenueScalarFieldEnum[]
}

export interface AggregateProjectedRevenueArgs {
  where?: ProjectedRevenueWhereInput
  orderBy?: ProjectedRevenueOrderByWithRelationInput[]
  cursor?: ProjectedRevenueWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.ProjectedRevenueCountAggregateInputType
  _avg?: Client.Prisma.ProjectedRevenueAvgAggregateInputType
  _sum?: Client.Prisma.ProjectedRevenueSumAggregateInputType
  _min?: Client.Prisma.ProjectedRevenueMinAggregateInputType
  _max?: Client.Prisma.ProjectedRevenueMaxAggregateInputType
}

export interface GroupByProjectedRevenueArgs {
  where?: ProjectedRevenueWhereInput
  orderBy?: ProjectedRevenueOrderByWithAggregationInput[]
  by: ProjectedRevenueScalarFieldEnum[]
  having?: ProjectedRevenueScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueProjectedRevenueArgs {
  where: ProjectedRevenueWhereUniqueInput | null
}

export interface FindFirstProjectedExpensesArgs {
  where?: ProjectedExpensesWhereInput | null
  orderBy?: ProjectedExpensesOrderByWithRelationInput[] | null
  cursor?: ProjectedExpensesWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: ProjectedExpensesScalarFieldEnum[] | null
}

export interface FindManyProjectedExpensesArgs {
  where?: ProjectedExpensesWhereInput
  orderBy?: ProjectedExpensesOrderByWithRelationInput[]
  cursor?: ProjectedExpensesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: ProjectedExpensesScalarFieldEnum[]
}

export interface AggregateProjectedExpensesArgs {
  where?: ProjectedExpensesWhereInput
  orderBy?: ProjectedExpensesOrderByWithRelationInput[]
  cursor?: ProjectedExpensesWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.ProjectedExpensesCountAggregateInputType
  _avg?: Client.Prisma.ProjectedExpensesAvgAggregateInputType
  _sum?: Client.Prisma.ProjectedExpensesSumAggregateInputType
  _min?: Client.Prisma.ProjectedExpensesMinAggregateInputType
  _max?: Client.Prisma.ProjectedExpensesMaxAggregateInputType
}

export interface GroupByProjectedExpensesArgs {
  where?: ProjectedExpensesWhereInput
  orderBy?: ProjectedExpensesOrderByWithAggregationInput[]
  by: ProjectedExpensesScalarFieldEnum[]
  having?: ProjectedExpensesScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueProjectedExpensesArgs {
  where: ProjectedExpensesWhereUniqueInput | null
}

export interface CreateOneClubArgs {
  data: ClubCreateInput
}

export interface UpsertOneClubArgs {
  where: ClubWhereUniqueInput
  create: ClubCreateInput
  update: ClubUpdateInput
}

export interface DeleteOneClubArgs {
  where: ClubWhereUniqueInput | null
}

export interface UpdateOneClubArgs {
  data: ClubUpdateInput | null
  where: ClubWhereUniqueInput | null
}

export interface UpdateManyClubArgs {
  data: ClubUpdateManyMutationInput
  where?: ClubWhereInput
}

export interface DeleteManyClubArgs {
  where?: ClubWhereInput
}

export interface CreateOneLinkArgs {
  data: LinkCreateInput
}

export interface UpsertOneLinkArgs {
  where: LinkWhereUniqueInput
  create: LinkCreateInput
  update: LinkUpdateInput
}

export interface DeleteOneLinkArgs {
  where: LinkWhereUniqueInput | null
}

export interface UpdateOneLinkArgs {
  data: LinkUpdateInput | null
  where: LinkWhereUniqueInput | null
}

export interface UpdateManyLinkArgs {
  data: LinkUpdateManyMutationInput
  where?: LinkWhereInput
}

export interface DeleteManyLinkArgs {
  where?: LinkWhereInput
}

export interface CreateOneClubApplicationInfoArgs {
  data: ClubApplicationInfoCreateInput
}

export interface UpsertOneClubApplicationInfoArgs {
  where: ClubApplicationInfoWhereUniqueInput
  create: ClubApplicationInfoCreateInput
  update: ClubApplicationInfoUpdateInput
}

export interface DeleteOneClubApplicationInfoArgs {
  where: ClubApplicationInfoWhereUniqueInput | null
}

export interface UpdateOneClubApplicationInfoArgs {
  data: ClubApplicationInfoUpdateInput | null
  where: ClubApplicationInfoWhereUniqueInput | null
}

export interface UpdateManyClubApplicationInfoArgs {
  data: ClubApplicationInfoUpdateManyMutationInput
  where?: ClubApplicationInfoWhereInput
}

export interface DeleteManyClubApplicationInfoArgs {
  where?: ClubApplicationInfoWhereInput
}

export interface CreateOneTagArgs {
  data: TagCreateInput
}

export interface UpsertOneTagArgs {
  where: TagWhereUniqueInput
  create: TagCreateInput
  update: TagUpdateInput
}

export interface DeleteOneTagArgs {
  where: TagWhereUniqueInput | null
}

export interface UpdateOneTagArgs {
  data: TagUpdateInput | null
  where: TagWhereUniqueInput | null
}

export interface UpdateManyTagArgs {
  data: TagUpdateManyMutationInput
  where?: TagWhereInput
}

export interface DeleteManyTagArgs {
  where?: TagWhereInput
}

export interface CreateOneUserArgs {
  data: UserCreateInput
}

export interface UpsertOneUserArgs {
  where: UserWhereUniqueInput
  create: UserCreateInput
  update: UserUpdateInput
}

export interface DeleteOneUserArgs {
  where: UserWhereUniqueInput | null
}

export interface UpdateOneUserArgs {
  data: UserUpdateInput | null
  where: UserWhereUniqueInput | null
}

export interface UpdateManyUserArgs {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}

export interface DeleteManyUserArgs {
  where?: UserWhereInput
}

export interface CreateOneInviteArgs {
  data: InviteCreateInput
}

export interface UpsertOneInviteArgs {
  where: InviteWhereUniqueInput
  create: InviteCreateInput
  update: InviteUpdateInput
}

export interface DeleteOneInviteArgs {
  where: InviteWhereUniqueInput | null
}

export interface UpdateOneInviteArgs {
  data: InviteUpdateInput | null
  where: InviteWhereUniqueInput | null
}

export interface UpdateManyInviteArgs {
  data: InviteUpdateManyMutationInput
  where?: InviteWhereInput
}

export interface DeleteManyInviteArgs {
  where?: InviteWhereInput
}

export interface CreateOneRoleArgs {
  data: RoleCreateInput
}

export interface UpsertOneRoleArgs {
  where: RoleWhereUniqueInput
  create: RoleCreateInput
  update: RoleUpdateInput
}

export interface DeleteOneRoleArgs {
  where: RoleWhereUniqueInput | null
}

export interface UpdateOneRoleArgs {
  data: RoleUpdateInput | null
  where: RoleWhereUniqueInput | null
}

export interface UpdateManyRoleArgs {
  data: RoleUpdateManyMutationInput
  where?: RoleWhereInput
}

export interface DeleteManyRoleArgs {
  where?: RoleWhereInput
}

export interface CreateOneProjectedRevenueArgs {
  data: ProjectedRevenueCreateInput
}

export interface UpsertOneProjectedRevenueArgs {
  where: ProjectedRevenueWhereUniqueInput
  create: ProjectedRevenueCreateInput
  update: ProjectedRevenueUpdateInput
}

export interface DeleteOneProjectedRevenueArgs {
  where: ProjectedRevenueWhereUniqueInput | null
}

export interface UpdateOneProjectedRevenueArgs {
  data: ProjectedRevenueUpdateInput | null
  where: ProjectedRevenueWhereUniqueInput | null
}

export interface UpdateManyProjectedRevenueArgs {
  data: ProjectedRevenueUpdateManyMutationInput
  where?: ProjectedRevenueWhereInput
}

export interface DeleteManyProjectedRevenueArgs {
  where?: ProjectedRevenueWhereInput
}

export interface CreateOneProjectedExpensesArgs {
  data: ProjectedExpensesCreateInput
}

export interface UpsertOneProjectedExpensesArgs {
  where: ProjectedExpensesWhereUniqueInput
  create: ProjectedExpensesCreateInput
  update: ProjectedExpensesUpdateInput
}

export interface DeleteOneProjectedExpensesArgs {
  where: ProjectedExpensesWhereUniqueInput | null
}

export interface UpdateOneProjectedExpensesArgs {
  data: ProjectedExpensesUpdateInput | null
  where: ProjectedExpensesWhereUniqueInput | null
}

export interface UpdateManyProjectedExpensesArgs {
  data: ProjectedExpensesUpdateManyMutationInput
  where?: ProjectedExpensesWhereInput
}

export interface DeleteManyProjectedExpensesArgs {
  where?: ProjectedExpensesWhereInput
}

export interface ExecuteRawArgs {
  query: string
  parameters?: any
}

export interface QueryRawArgs {
  query: string
  parameters?: any
}

export interface ClubWhereInput {
  AND?: ClubWhereInput[]
  OR?: ClubWhereInput[]
  NOT?: ClubWhereInput[]
  id?: IntFilter
  name?: StringNullableFilter | null
  slug?: StringNullableFilter | null
  description?: StringNullableFilter | null
  email?: StringNullableFilter | null
  meetingDate?: StringNullableFilter | null
  location?: StringNullableFilter | null
  approval?: StringNullableFilter | null
  status?: StringNullableFilter | null
  availability?: StringNullableFilter | null
  links?: LinkListRelationFilter
  applicationInfo?: ClubApplicationInfoWhereInput | null
  tags?: TagListRelationFilter
  members?: UserListRelationFilter
  editors?: UserListRelationFilter
  roles?: RoleListRelationFilter
  invites?: InviteListRelationFilter
}

export interface ClubOrderByWithRelationInput {
  id?: SortOrder
  name?: SortOrder
  slug?: SortOrder
  description?: SortOrder
  email?: SortOrder
  meetingDate?: SortOrder
  location?: SortOrder
  approval?: SortOrder
  status?: SortOrder
  availability?: SortOrder
  links?: LinkOrderByRelationAggregateInput
  applicationInfo?: ClubApplicationInfoOrderByWithRelationInput
  tags?: TagOrderByRelationAggregateInput
  members?: UserOrderByRelationAggregateInput
  editors?: UserOrderByRelationAggregateInput
  roles?: RoleOrderByRelationAggregateInput
  invites?: InviteOrderByRelationAggregateInput
}

export interface ClubWhereUniqueInput {
  id?: number
  name?: string
  slug?: string
}

export interface ClubOrderByWithAggregationInput {
  id?: SortOrder
  name?: SortOrder
  slug?: SortOrder
  description?: SortOrder
  email?: SortOrder
  meetingDate?: SortOrder
  location?: SortOrder
  approval?: SortOrder
  status?: SortOrder
  availability?: SortOrder
  _count?: ClubCountOrderByAggregateInput
  _avg?: ClubAvgOrderByAggregateInput
  _max?: ClubMaxOrderByAggregateInput
  _min?: ClubMinOrderByAggregateInput
  _sum?: ClubSumOrderByAggregateInput
}

export interface ClubScalarWhereWithAggregatesInput {
  AND?: ClubScalarWhereWithAggregatesInput[]
  OR?: ClubScalarWhereWithAggregatesInput[]
  NOT?: ClubScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  name?: StringNullableWithAggregatesFilter | null
  slug?: StringNullableWithAggregatesFilter | null
  description?: StringNullableWithAggregatesFilter | null
  email?: StringNullableWithAggregatesFilter | null
  meetingDate?: StringNullableWithAggregatesFilter | null
  location?: StringNullableWithAggregatesFilter | null
  approval?: StringNullableWithAggregatesFilter | null
  status?: StringNullableWithAggregatesFilter | null
  availability?: StringNullableWithAggregatesFilter | null
}

export interface LinkWhereInput {
  AND?: LinkWhereInput[]
  OR?: LinkWhereInput[]
  NOT?: LinkWhereInput[]
  id?: IntFilter
  club?: ClubWhereInput
  clubId?: IntFilter
  name?: StringNullableFilter | null
  link?: StringFilter
  type?: StringFilter
}

export interface LinkOrderByWithRelationInput {
  id?: SortOrder
  club?: ClubOrderByWithRelationInput
  clubId?: SortOrder
  name?: SortOrder
  link?: SortOrder
  type?: SortOrder
}

export interface LinkWhereUniqueInput {
  id?: number
}

export interface LinkOrderByWithAggregationInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  link?: SortOrder
  type?: SortOrder
  _count?: LinkCountOrderByAggregateInput
  _avg?: LinkAvgOrderByAggregateInput
  _max?: LinkMaxOrderByAggregateInput
  _min?: LinkMinOrderByAggregateInput
  _sum?: LinkSumOrderByAggregateInput
}

export interface LinkScalarWhereWithAggregatesInput {
  AND?: LinkScalarWhereWithAggregatesInput[]
  OR?: LinkScalarWhereWithAggregatesInput[]
  NOT?: LinkScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  clubId?: IntWithAggregatesFilter
  name?: StringNullableWithAggregatesFilter | null
  link?: StringWithAggregatesFilter
  type?: StringWithAggregatesFilter
}

export interface ClubApplicationInfoWhereInput {
  AND?: ClubApplicationInfoWhereInput[]
  OR?: ClubApplicationInfoWhereInput[]
  NOT?: ClubApplicationInfoWhereInput[]
  id?: IntFilter
  teacher?: UserWhereInput
  userId?: IntFilter
  club?: ClubWhereInput
  clubId?: IntFilter
  projectedRevenue?: ProjectedRevenueListRelationFilter
  projectedExpenses?: ProjectedExpensesListRelationFilter
  purpose?: StringFilter
  membershipRequirements?: StringFilter
  dutiesOfMembers?: StringFilter
  titlesAndDutiesOfOfficers?: StringFilter
  selectionOfOfficers?: StringFilter
  officerMinimumGPA?: FloatFilter
  percentAttendanceForOfficialMeeting?: IntFilter
  percentAttendanceToApproveDecision?: IntFilter
}

export interface ClubApplicationInfoOrderByWithRelationInput {
  id?: SortOrder
  teacher?: UserOrderByWithRelationInput
  userId?: SortOrder
  club?: ClubOrderByWithRelationInput
  clubId?: SortOrder
  projectedRevenue?: ProjectedRevenueOrderByRelationAggregateInput
  projectedExpenses?: ProjectedExpensesOrderByRelationAggregateInput
  purpose?: SortOrder
  membershipRequirements?: SortOrder
  dutiesOfMembers?: SortOrder
  titlesAndDutiesOfOfficers?: SortOrder
  selectionOfOfficers?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
}

export interface ClubApplicationInfoWhereUniqueInput {
  id?: number
  clubId?: number
}

export interface ClubApplicationInfoOrderByWithAggregationInput {
  id?: SortOrder
  userId?: SortOrder
  clubId?: SortOrder
  purpose?: SortOrder
  membershipRequirements?: SortOrder
  dutiesOfMembers?: SortOrder
  titlesAndDutiesOfOfficers?: SortOrder
  selectionOfOfficers?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
  _count?: ClubApplicationInfoCountOrderByAggregateInput
  _avg?: ClubApplicationInfoAvgOrderByAggregateInput
  _max?: ClubApplicationInfoMaxOrderByAggregateInput
  _min?: ClubApplicationInfoMinOrderByAggregateInput
  _sum?: ClubApplicationInfoSumOrderByAggregateInput
}

export interface ClubApplicationInfoScalarWhereWithAggregatesInput {
  AND?: ClubApplicationInfoScalarWhereWithAggregatesInput[]
  OR?: ClubApplicationInfoScalarWhereWithAggregatesInput[]
  NOT?: ClubApplicationInfoScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  userId?: IntWithAggregatesFilter
  clubId?: IntWithAggregatesFilter
  purpose?: StringWithAggregatesFilter
  membershipRequirements?: StringWithAggregatesFilter
  dutiesOfMembers?: StringWithAggregatesFilter
  titlesAndDutiesOfOfficers?: StringWithAggregatesFilter
  selectionOfOfficers?: StringWithAggregatesFilter
  officerMinimumGPA?: FloatWithAggregatesFilter
  percentAttendanceForOfficialMeeting?: IntWithAggregatesFilter
  percentAttendanceToApproveDecision?: IntWithAggregatesFilter
}

export interface TagWhereInput {
  AND?: TagWhereInput[]
  OR?: TagWhereInput[]
  NOT?: TagWhereInput[]
  id?: IntFilter
  name?: StringFilter
  clubs?: ClubListRelationFilter
  interestedUsers?: UserListRelationFilter
}

export interface TagOrderByWithRelationInput {
  id?: SortOrder
  name?: SortOrder
  clubs?: ClubOrderByRelationAggregateInput
  interestedUsers?: UserOrderByRelationAggregateInput
}

export interface TagWhereUniqueInput {
  id?: number
  name?: string
}

export interface TagOrderByWithAggregationInput {
  id?: SortOrder
  name?: SortOrder
  _count?: TagCountOrderByAggregateInput
  _avg?: TagAvgOrderByAggregateInput
  _max?: TagMaxOrderByAggregateInput
  _min?: TagMinOrderByAggregateInput
  _sum?: TagSumOrderByAggregateInput
}

export interface TagScalarWhereWithAggregatesInput {
  AND?: TagScalarWhereWithAggregatesInput[]
  OR?: TagScalarWhereWithAggregatesInput[]
  NOT?: TagScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  name?: StringWithAggregatesFilter
}

export interface UserWhereInput {
  AND?: UserWhereInput[]
  OR?: UserWhereInput[]
  NOT?: UserWhereInput[]
  id?: IntFilter
  ccid?: StringFilter
  firstname?: StringFilter
  lastname?: StringFilter
  email?: StringFilter
  emailVerified?: BoolFilter
  password?: StringFilter
  grade?: StringFilter
  type?: StringFilter
  interests?: TagListRelationFilter
  clubs?: ClubListRelationFilter
  canEdit?: ClubListRelationFilter
  advisor?: ClubApplicationInfoListRelationFilter
  roles?: RoleListRelationFilter
  invites?: InviteListRelationFilter
}

export interface UserOrderByWithRelationInput {
  id?: SortOrder
  ccid?: SortOrder
  firstname?: SortOrder
  lastname?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  password?: SortOrder
  grade?: SortOrder
  type?: SortOrder
  interests?: TagOrderByRelationAggregateInput
  clubs?: ClubOrderByRelationAggregateInput
  canEdit?: ClubOrderByRelationAggregateInput
  advisor?: ClubApplicationInfoOrderByRelationAggregateInput
  roles?: RoleOrderByRelationAggregateInput
  invites?: InviteOrderByRelationAggregateInput
}

export interface UserWhereUniqueInput {
  id?: number
  ccid?: string
  email?: string
}

export interface UserOrderByWithAggregationInput {
  id?: SortOrder
  ccid?: SortOrder
  firstname?: SortOrder
  lastname?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  password?: SortOrder
  grade?: SortOrder
  type?: SortOrder
  _count?: UserCountOrderByAggregateInput
  _avg?: UserAvgOrderByAggregateInput
  _max?: UserMaxOrderByAggregateInput
  _min?: UserMinOrderByAggregateInput
  _sum?: UserSumOrderByAggregateInput
}

export interface UserScalarWhereWithAggregatesInput {
  AND?: UserScalarWhereWithAggregatesInput[]
  OR?: UserScalarWhereWithAggregatesInput[]
  NOT?: UserScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  ccid?: StringWithAggregatesFilter
  firstname?: StringWithAggregatesFilter
  lastname?: StringWithAggregatesFilter
  email?: StringWithAggregatesFilter
  emailVerified?: BoolWithAggregatesFilter
  password?: StringWithAggregatesFilter
  grade?: StringWithAggregatesFilter
  type?: StringWithAggregatesFilter
}

export interface InviteWhereInput {
  AND?: InviteWhereInput[]
  OR?: InviteWhereInput[]
  NOT?: InviteWhereInput[]
  id?: IntFilter
  status?: StringFilter
  club?: ClubWhereInput
  clubId?: IntFilter
  user?: UserWhereInput
  userId?: IntFilter
}

export interface InviteOrderByWithRelationInput {
  id?: SortOrder
  status?: SortOrder
  club?: ClubOrderByWithRelationInput
  clubId?: SortOrder
  user?: UserOrderByWithRelationInput
  userId?: SortOrder
}

export interface InviteWhereUniqueInput {
  id?: number
}

export interface InviteOrderByWithAggregationInput {
  id?: SortOrder
  status?: SortOrder
  clubId?: SortOrder
  userId?: SortOrder
  _count?: InviteCountOrderByAggregateInput
  _avg?: InviteAvgOrderByAggregateInput
  _max?: InviteMaxOrderByAggregateInput
  _min?: InviteMinOrderByAggregateInput
  _sum?: InviteSumOrderByAggregateInput
}

export interface InviteScalarWhereWithAggregatesInput {
  AND?: InviteScalarWhereWithAggregatesInput[]
  OR?: InviteScalarWhereWithAggregatesInput[]
  NOT?: InviteScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  status?: StringWithAggregatesFilter
  clubId?: IntWithAggregatesFilter
  userId?: IntWithAggregatesFilter
}

export interface RoleWhereInput {
  AND?: RoleWhereInput[]
  OR?: RoleWhereInput[]
  NOT?: RoleWhereInput[]
  id?: IntFilter
  name?: StringFilter
  color?: StringFilter
  description?: StringFilter
  users?: UserListRelationFilter
  club?: ClubWhereInput
  clubId?: IntFilter
  type?: StringFilter
}

export interface RoleOrderByWithRelationInput {
  id?: SortOrder
  name?: SortOrder
  color?: SortOrder
  description?: SortOrder
  users?: UserOrderByRelationAggregateInput
  club?: ClubOrderByWithRelationInput
  clubId?: SortOrder
  type?: SortOrder
}

export interface RoleWhereUniqueInput {
  id?: number
}

export interface RoleOrderByWithAggregationInput {
  id?: SortOrder
  name?: SortOrder
  color?: SortOrder
  description?: SortOrder
  clubId?: SortOrder
  type?: SortOrder
  _count?: RoleCountOrderByAggregateInput
  _avg?: RoleAvgOrderByAggregateInput
  _max?: RoleMaxOrderByAggregateInput
  _min?: RoleMinOrderByAggregateInput
  _sum?: RoleSumOrderByAggregateInput
}

export interface RoleScalarWhereWithAggregatesInput {
  AND?: RoleScalarWhereWithAggregatesInput[]
  OR?: RoleScalarWhereWithAggregatesInput[]
  NOT?: RoleScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  name?: StringWithAggregatesFilter
  color?: StringWithAggregatesFilter
  description?: StringWithAggregatesFilter
  clubId?: IntWithAggregatesFilter
  type?: StringWithAggregatesFilter
}

export interface ProjectedRevenueWhereInput {
  AND?: ProjectedRevenueWhereInput[]
  OR?: ProjectedRevenueWhereInput[]
  NOT?: ProjectedRevenueWhereInput[]
  id?: IntFilter
  club?: ClubApplicationInfoWhereInput
  clubId?: IntFilter
  name?: StringFilter
  amount?: FloatFilter
  date?: StringFilter
}

export interface ProjectedRevenueOrderByWithRelationInput {
  id?: SortOrder
  club?: ClubApplicationInfoOrderByWithRelationInput
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedRevenueWhereUniqueInput {
  id?: number
}

export interface ProjectedRevenueOrderByWithAggregationInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
  _count?: ProjectedRevenueCountOrderByAggregateInput
  _avg?: ProjectedRevenueAvgOrderByAggregateInput
  _max?: ProjectedRevenueMaxOrderByAggregateInput
  _min?: ProjectedRevenueMinOrderByAggregateInput
  _sum?: ProjectedRevenueSumOrderByAggregateInput
}

export interface ProjectedRevenueScalarWhereWithAggregatesInput {
  AND?: ProjectedRevenueScalarWhereWithAggregatesInput[]
  OR?: ProjectedRevenueScalarWhereWithAggregatesInput[]
  NOT?: ProjectedRevenueScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  clubId?: IntWithAggregatesFilter
  name?: StringWithAggregatesFilter
  amount?: FloatWithAggregatesFilter
  date?: StringWithAggregatesFilter
}

export interface ProjectedExpensesWhereInput {
  AND?: ProjectedExpensesWhereInput[]
  OR?: ProjectedExpensesWhereInput[]
  NOT?: ProjectedExpensesWhereInput[]
  id?: IntFilter
  club?: ClubApplicationInfoWhereInput
  clubId?: IntFilter
  name?: StringFilter
  amount?: FloatFilter
  date?: StringFilter
}

export interface ProjectedExpensesOrderByWithRelationInput {
  id?: SortOrder
  club?: ClubApplicationInfoOrderByWithRelationInput
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedExpensesWhereUniqueInput {
  id?: number
}

export interface ProjectedExpensesOrderByWithAggregationInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
  _count?: ProjectedExpensesCountOrderByAggregateInput
  _avg?: ProjectedExpensesAvgOrderByAggregateInput
  _max?: ProjectedExpensesMaxOrderByAggregateInput
  _min?: ProjectedExpensesMinOrderByAggregateInput
  _sum?: ProjectedExpensesSumOrderByAggregateInput
}

export interface ProjectedExpensesScalarWhereWithAggregatesInput {
  AND?: ProjectedExpensesScalarWhereWithAggregatesInput[]
  OR?: ProjectedExpensesScalarWhereWithAggregatesInput[]
  NOT?: ProjectedExpensesScalarWhereWithAggregatesInput[]
  id?: IntWithAggregatesFilter
  clubId?: IntWithAggregatesFilter
  name?: StringWithAggregatesFilter
  amount?: FloatWithAggregatesFilter
  date?: StringWithAggregatesFilter
}

export interface ClubCreateInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  members?: UserCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  roles?: RoleCreateNestedManyWithoutClubInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubUpdateInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  members?: UserUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  roles?: RoleUpdateManyWithoutClubInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface ClubUpdateManyMutationInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
}

export interface ClubUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
}

export interface LinkCreateInput {
  club: ClubCreateNestedOneWithoutLinksInput
  name?: string | null
  link: string
  type: string
}

export interface LinkUncheckedCreateInput {
  id?: number
  clubId: number
  name?: string | null
  link: string
  type: string
}

export interface LinkUpdateInput {
  club?: ClubUpdateOneRequiredWithoutLinksInput
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface LinkUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface LinkUpdateManyMutationInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface LinkUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface ClubApplicationInfoCreateInput {
  teacher: UserCreateNestedOneWithoutAdvisorInput
  club: ClubCreateNestedOneWithoutApplicationInfoInput
  projectedRevenue?: ProjectedRevenueCreateNestedManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoUncheckedCreateInput {
  id?: number
  userId: number
  clubId: number
  projectedRevenue?: ProjectedRevenueUncheckedCreateNestedManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUncheckedCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoUpdateInput {
  teacher?: UserUpdateOneRequiredWithoutAdvisorInput
  club?: ClubUpdateOneRequiredWithoutApplicationInfoInput
  projectedRevenue?: ProjectedRevenueUpdateManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  projectedRevenue?: ProjectedRevenueUncheckedUpdateManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUncheckedUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUpdateManyMutationInput {
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface TagCreateInput {
  name: string
  clubs?: ClubCreateNestedManyWithoutTagsInput
  interestedUsers?: UserCreateNestedManyWithoutInterestsInput
}

export interface TagUncheckedCreateInput {
  id?: number
  name: string
  clubs?: ClubUncheckedCreateNestedManyWithoutTagsInput
  interestedUsers?: UserUncheckedCreateNestedManyWithoutInterestsInput
}

export interface TagUpdateInput {
  name?: StringFieldUpdateOperationsInput
  clubs?: ClubUpdateManyWithoutTagsInput
  interestedUsers?: UserUpdateManyWithoutInterestsInput
}

export interface TagUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  clubs?: ClubUncheckedUpdateManyWithoutTagsInput
  interestedUsers?: UserUncheckedUpdateManyWithoutInterestsInput
}

export interface TagUpdateManyMutationInput {
  name?: StringFieldUpdateOperationsInput
}

export interface TagUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
}

export interface UserCreateInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubCreateNestedManyWithoutMembersInput
  canEdit?: ClubCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoCreateNestedManyWithoutTeacherInput
  roles?: RoleCreateNestedManyWithoutUsersInput
  invites?: InviteCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagUncheckedCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedCreateNestedManyWithoutMembersInput
  canEdit?: ClubUncheckedCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput
  roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  invites?: InviteUncheckedCreateNestedManyWithoutUserInput
}

export interface UserUpdateInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUpdateManyWithoutMembersInput
  canEdit?: ClubUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUpdateManyWithoutTeacherInput
  roles?: RoleUpdateManyWithoutUsersInput
  invites?: InviteUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUncheckedUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedUpdateManyWithoutMembersInput
  canEdit?: ClubUncheckedUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput
  roles?: RoleUncheckedUpdateManyWithoutUsersInput
  invites?: InviteUncheckedUpdateManyWithoutUserInput
}

export interface UserUpdateManyMutationInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface UserUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface InviteCreateInput {
  status?: string
  club: ClubCreateNestedOneWithoutInvitesInput
  user: UserCreateNestedOneWithoutInvitesInput
}

export interface InviteUncheckedCreateInput {
  id?: number
  status?: string
  clubId: number
  userId: number
}

export interface InviteUpdateInput {
  status?: StringFieldUpdateOperationsInput
  club?: ClubUpdateOneRequiredWithoutInvitesInput
  user?: UserUpdateOneRequiredWithoutInvitesInput
}

export interface InviteUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  status?: StringFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
}

export interface InviteUpdateManyMutationInput {
  status?: StringFieldUpdateOperationsInput
}

export interface InviteUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  status?: StringFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
}

export interface RoleCreateInput {
  name: string
  color: string
  description: string
  users?: UserCreateNestedManyWithoutRolesInput
  club: ClubCreateNestedOneWithoutRolesInput
  type?: string
}

export interface RoleUncheckedCreateInput {
  id?: number
  name: string
  color: string
  description: string
  users?: UserUncheckedCreateNestedManyWithoutRolesInput
  clubId: number
  type?: string
}

export interface RoleUpdateInput {
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  users?: UserUpdateManyWithoutRolesInput
  club?: ClubUpdateOneRequiredWithoutRolesInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  users?: UserUncheckedUpdateManyWithoutRolesInput
  clubId?: IntFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUpdateManyMutationInput {
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface ProjectedRevenueCreateInput {
  club: ClubApplicationInfoCreateNestedOneWithoutProjectedRevenueInput
  name: string
  amount: number
  date: string
}

export interface ProjectedRevenueUncheckedCreateInput {
  id?: number
  clubId: number
  name: string
  amount: number
  date: string
}

export interface ProjectedRevenueUpdateInput {
  club?: ClubApplicationInfoUpdateOneRequiredWithoutProjectedRevenueInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedRevenueUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedRevenueUpdateManyMutationInput {
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedRevenueUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesCreateInput {
  club: ClubApplicationInfoCreateNestedOneWithoutProjectedExpensesInput
  name: string
  amount: number
  date: string
}

export interface ProjectedExpensesUncheckedCreateInput {
  id?: number
  clubId: number
  name: string
  amount: number
  date: string
}

export interface ProjectedExpensesUpdateInput {
  club?: ClubApplicationInfoUpdateOneRequiredWithoutProjectedExpensesInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesUncheckedUpdateInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesUpdateManyMutationInput {
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesUncheckedUpdateManyInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface IntFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter
}

export interface StringNullableFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringNullableFilter | null
}

export interface LinkListRelationFilter {
  every?: LinkWhereInput
  some?: LinkWhereInput
  none?: LinkWhereInput
}

export interface ClubApplicationInfoRelationFilter {
  is?: ClubApplicationInfoWhereInput
  isNot?: ClubApplicationInfoWhereInput
}

export interface TagListRelationFilter {
  every?: TagWhereInput
  some?: TagWhereInput
  none?: TagWhereInput
}

export interface UserListRelationFilter {
  every?: UserWhereInput
  some?: UserWhereInput
  none?: UserWhereInput
}

export interface RoleListRelationFilter {
  every?: RoleWhereInput
  some?: RoleWhereInput
  none?: RoleWhereInput
}

export interface InviteListRelationFilter {
  every?: InviteWhereInput
  some?: InviteWhereInput
  none?: InviteWhereInput
}

export interface LinkOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface TagOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface UserOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface RoleOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface InviteOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface ClubCountOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
  slug?: SortOrder
  description?: SortOrder
  email?: SortOrder
  meetingDate?: SortOrder
  location?: SortOrder
  approval?: SortOrder
  status?: SortOrder
  availability?: SortOrder
}

export interface ClubAvgOrderByAggregateInput {
  id?: SortOrder
}

export interface ClubMaxOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
  slug?: SortOrder
  description?: SortOrder
  email?: SortOrder
  meetingDate?: SortOrder
  location?: SortOrder
  approval?: SortOrder
  status?: SortOrder
  availability?: SortOrder
}

export interface ClubMinOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
  slug?: SortOrder
  description?: SortOrder
  email?: SortOrder
  meetingDate?: SortOrder
  location?: SortOrder
  approval?: SortOrder
  status?: SortOrder
  availability?: SortOrder
}

export interface ClubSumOrderByAggregateInput {
  id?: SortOrder
}

export interface IntWithAggregatesFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntWithAggregatesFilter
  _count?: NestedIntFilter
  _avg?: NestedFloatFilter
  _sum?: NestedIntFilter
  _min?: NestedIntFilter
  _max?: NestedIntFilter
}

export interface StringNullableWithAggregatesFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringNullableWithAggregatesFilter | null
  _count?: NestedIntNullableFilter
  _min?: NestedStringNullableFilter
  _max?: NestedStringNullableFilter
}

export interface ClubRelationFilter {
  is?: ClubWhereInput
  isNot?: ClubWhereInput
}

export interface StringFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter
}

export interface LinkCountOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  link?: SortOrder
  type?: SortOrder
}

export interface LinkAvgOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
}

export interface LinkMaxOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  link?: SortOrder
  type?: SortOrder
}

export interface LinkMinOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  link?: SortOrder
  type?: SortOrder
}

export interface LinkSumOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
}

export interface StringWithAggregatesFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringWithAggregatesFilter
  _count?: NestedIntFilter
  _min?: NestedStringFilter
  _max?: NestedStringFilter
}

export interface UserRelationFilter {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export interface ProjectedRevenueListRelationFilter {
  every?: ProjectedRevenueWhereInput
  some?: ProjectedRevenueWhereInput
  none?: ProjectedRevenueWhereInput
}

export interface ProjectedExpensesListRelationFilter {
  every?: ProjectedExpensesWhereInput
  some?: ProjectedExpensesWhereInput
  none?: ProjectedExpensesWhereInput
}

export interface FloatFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatFilter
}

export interface ProjectedRevenueOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface ProjectedExpensesOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface ClubApplicationInfoCountOrderByAggregateInput {
  id?: SortOrder
  userId?: SortOrder
  clubId?: SortOrder
  purpose?: SortOrder
  membershipRequirements?: SortOrder
  dutiesOfMembers?: SortOrder
  titlesAndDutiesOfOfficers?: SortOrder
  selectionOfOfficers?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
}

export interface ClubApplicationInfoAvgOrderByAggregateInput {
  id?: SortOrder
  userId?: SortOrder
  clubId?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
}

export interface ClubApplicationInfoMaxOrderByAggregateInput {
  id?: SortOrder
  userId?: SortOrder
  clubId?: SortOrder
  purpose?: SortOrder
  membershipRequirements?: SortOrder
  dutiesOfMembers?: SortOrder
  titlesAndDutiesOfOfficers?: SortOrder
  selectionOfOfficers?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
}

export interface ClubApplicationInfoMinOrderByAggregateInput {
  id?: SortOrder
  userId?: SortOrder
  clubId?: SortOrder
  purpose?: SortOrder
  membershipRequirements?: SortOrder
  dutiesOfMembers?: SortOrder
  titlesAndDutiesOfOfficers?: SortOrder
  selectionOfOfficers?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
}

export interface ClubApplicationInfoSumOrderByAggregateInput {
  id?: SortOrder
  userId?: SortOrder
  clubId?: SortOrder
  officerMinimumGPA?: SortOrder
  percentAttendanceForOfficialMeeting?: SortOrder
  percentAttendanceToApproveDecision?: SortOrder
}

export interface FloatWithAggregatesFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatWithAggregatesFilter
  _count?: NestedIntFilter
  _avg?: NestedFloatFilter
  _sum?: NestedFloatFilter
  _min?: NestedFloatFilter
  _max?: NestedFloatFilter
}

export interface ClubListRelationFilter {
  every?: ClubWhereInput
  some?: ClubWhereInput
  none?: ClubWhereInput
}

export interface ClubOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface TagCountOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
}

export interface TagAvgOrderByAggregateInput {
  id?: SortOrder
}

export interface TagMaxOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
}

export interface TagMinOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
}

export interface TagSumOrderByAggregateInput {
  id?: SortOrder
}

export interface BoolFilter {
  equals?: boolean
  not?: NestedBoolFilter
}

export interface ClubApplicationInfoListRelationFilter {
  every?: ClubApplicationInfoWhereInput
  some?: ClubApplicationInfoWhereInput
  none?: ClubApplicationInfoWhereInput
}

export interface ClubApplicationInfoOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface UserCountOrderByAggregateInput {
  id?: SortOrder
  ccid?: SortOrder
  firstname?: SortOrder
  lastname?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  password?: SortOrder
  grade?: SortOrder
  type?: SortOrder
}

export interface UserAvgOrderByAggregateInput {
  id?: SortOrder
}

export interface UserMaxOrderByAggregateInput {
  id?: SortOrder
  ccid?: SortOrder
  firstname?: SortOrder
  lastname?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  password?: SortOrder
  grade?: SortOrder
  type?: SortOrder
}

export interface UserMinOrderByAggregateInput {
  id?: SortOrder
  ccid?: SortOrder
  firstname?: SortOrder
  lastname?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  password?: SortOrder
  grade?: SortOrder
  type?: SortOrder
}

export interface UserSumOrderByAggregateInput {
  id?: SortOrder
}

export interface BoolWithAggregatesFilter {
  equals?: boolean
  not?: NestedBoolWithAggregatesFilter
  _count?: NestedIntFilter
  _min?: NestedBoolFilter
  _max?: NestedBoolFilter
}

export interface InviteCountOrderByAggregateInput {
  id?: SortOrder
  status?: SortOrder
  clubId?: SortOrder
  userId?: SortOrder
}

export interface InviteAvgOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  userId?: SortOrder
}

export interface InviteMaxOrderByAggregateInput {
  id?: SortOrder
  status?: SortOrder
  clubId?: SortOrder
  userId?: SortOrder
}

export interface InviteMinOrderByAggregateInput {
  id?: SortOrder
  status?: SortOrder
  clubId?: SortOrder
  userId?: SortOrder
}

export interface InviteSumOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  userId?: SortOrder
}

export interface RoleCountOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
  color?: SortOrder
  description?: SortOrder
  clubId?: SortOrder
  type?: SortOrder
}

export interface RoleAvgOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
}

export interface RoleMaxOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
  color?: SortOrder
  description?: SortOrder
  clubId?: SortOrder
  type?: SortOrder
}

export interface RoleMinOrderByAggregateInput {
  id?: SortOrder
  name?: SortOrder
  color?: SortOrder
  description?: SortOrder
  clubId?: SortOrder
  type?: SortOrder
}

export interface RoleSumOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
}

export interface ProjectedRevenueCountOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedRevenueAvgOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  amount?: SortOrder
}

export interface ProjectedRevenueMaxOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedRevenueMinOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedRevenueSumOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  amount?: SortOrder
}

export interface ProjectedExpensesCountOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedExpensesAvgOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  amount?: SortOrder
}

export interface ProjectedExpensesMaxOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedExpensesMinOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  name?: SortOrder
  amount?: SortOrder
  date?: SortOrder
}

export interface ProjectedExpensesSumOrderByAggregateInput {
  id?: SortOrder
  clubId?: SortOrder
  amount?: SortOrder
}

export interface LinkCreateNestedManyWithoutClubInput {
  create?: LinkCreateWithoutClubInput[]
  connectOrCreate?: LinkCreateOrConnectWithoutClubInput[]
  connect?: LinkWhereUniqueInput[]
}

export interface ClubApplicationInfoCreateNestedOneWithoutClubInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutClubInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutClubInput
  connect?: ClubApplicationInfoWhereUniqueInput
}

export interface TagCreateNestedManyWithoutClubsInput {
  create?: TagCreateWithoutClubsInput[]
  connectOrCreate?: TagCreateOrConnectWithoutClubsInput[]
  connect?: TagWhereUniqueInput[]
}

export interface UserCreateNestedManyWithoutClubsInput {
  create?: UserCreateWithoutClubsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutClubsInput[]
  connect?: UserWhereUniqueInput[]
}

export interface UserCreateNestedManyWithoutCanEditInput {
  create?: UserCreateWithoutCanEditInput[]
  connectOrCreate?: UserCreateOrConnectWithoutCanEditInput[]
  connect?: UserWhereUniqueInput[]
}

export interface RoleCreateNestedManyWithoutClubInput {
  create?: RoleCreateWithoutClubInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutClubInput[]
  connect?: RoleWhereUniqueInput[]
}

export interface InviteCreateNestedManyWithoutClubInput {
  create?: InviteCreateWithoutClubInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutClubInput[]
  connect?: InviteWhereUniqueInput[]
}

export interface LinkUncheckedCreateNestedManyWithoutClubInput {
  create?: LinkCreateWithoutClubInput[]
  connectOrCreate?: LinkCreateOrConnectWithoutClubInput[]
  connect?: LinkWhereUniqueInput[]
}

export interface ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutClubInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutClubInput
  connect?: ClubApplicationInfoWhereUniqueInput
}

export interface TagUncheckedCreateNestedManyWithoutClubsInput {
  create?: TagCreateWithoutClubsInput[]
  connectOrCreate?: TagCreateOrConnectWithoutClubsInput[]
  connect?: TagWhereUniqueInput[]
}

export interface UserUncheckedCreateNestedManyWithoutClubsInput {
  create?: UserCreateWithoutClubsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutClubsInput[]
  connect?: UserWhereUniqueInput[]
}

export interface UserUncheckedCreateNestedManyWithoutCanEditInput {
  create?: UserCreateWithoutCanEditInput[]
  connectOrCreate?: UserCreateOrConnectWithoutCanEditInput[]
  connect?: UserWhereUniqueInput[]
}

export interface RoleUncheckedCreateNestedManyWithoutClubInput {
  create?: RoleCreateWithoutClubInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutClubInput[]
  connect?: RoleWhereUniqueInput[]
}

export interface InviteUncheckedCreateNestedManyWithoutClubInput {
  create?: InviteCreateWithoutClubInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutClubInput[]
  connect?: InviteWhereUniqueInput[]
}

export interface NullableStringFieldUpdateOperationsInput {
  set?: string | null
}

export interface LinkUpdateManyWithoutClubInput {
  create?: LinkCreateWithoutClubInput[]
  connectOrCreate?: LinkCreateOrConnectWithoutClubInput[]
  upsert?: LinkUpsertWithWhereUniqueWithoutClubInput[]
  set?: LinkWhereUniqueInput[]
  disconnect?: LinkWhereUniqueInput[]
  delete?: LinkWhereUniqueInput[]
  connect?: LinkWhereUniqueInput[]
  update?: LinkUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: LinkUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: LinkScalarWhereInput[]
}

export interface ClubApplicationInfoUpdateOneWithoutClubInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutClubInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutClubInput
  upsert?: ClubApplicationInfoUpsertWithoutClubInput
  disconnect?: boolean
  delete?: boolean
  connect?: ClubApplicationInfoWhereUniqueInput
  update?: ClubApplicationInfoUncheckedUpdateWithoutClubInput
}

export interface TagUpdateManyWithoutClubsInput {
  create?: TagCreateWithoutClubsInput[]
  connectOrCreate?: TagCreateOrConnectWithoutClubsInput[]
  upsert?: TagUpsertWithWhereUniqueWithoutClubsInput[]
  set?: TagWhereUniqueInput[]
  disconnect?: TagWhereUniqueInput[]
  delete?: TagWhereUniqueInput[]
  connect?: TagWhereUniqueInput[]
  update?: TagUpdateWithWhereUniqueWithoutClubsInput[]
  updateMany?: TagUpdateManyWithWhereWithoutClubsInput[]
  deleteMany?: TagScalarWhereInput[]
}

export interface UserUpdateManyWithoutClubsInput {
  create?: UserCreateWithoutClubsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutClubsInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutClubsInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutClubsInput[]
  updateMany?: UserUpdateManyWithWhereWithoutClubsInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface UserUpdateManyWithoutCanEditInput {
  create?: UserCreateWithoutCanEditInput[]
  connectOrCreate?: UserCreateOrConnectWithoutCanEditInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutCanEditInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutCanEditInput[]
  updateMany?: UserUpdateManyWithWhereWithoutCanEditInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface RoleUpdateManyWithoutClubInput {
  create?: RoleCreateWithoutClubInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutClubInput[]
  upsert?: RoleUpsertWithWhereUniqueWithoutClubInput[]
  set?: RoleWhereUniqueInput[]
  disconnect?: RoleWhereUniqueInput[]
  delete?: RoleWhereUniqueInput[]
  connect?: RoleWhereUniqueInput[]
  update?: RoleUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: RoleUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: RoleScalarWhereInput[]
}

export interface InviteUpdateManyWithoutClubInput {
  create?: InviteCreateWithoutClubInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutClubInput[]
  upsert?: InviteUpsertWithWhereUniqueWithoutClubInput[]
  set?: InviteWhereUniqueInput[]
  disconnect?: InviteWhereUniqueInput[]
  delete?: InviteWhereUniqueInput[]
  connect?: InviteWhereUniqueInput[]
  update?: InviteUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: InviteUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: InviteScalarWhereInput[]
}

export interface IntFieldUpdateOperationsInput {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export interface LinkUncheckedUpdateManyWithoutClubInput {
  create?: LinkCreateWithoutClubInput[]
  connectOrCreate?: LinkCreateOrConnectWithoutClubInput[]
  upsert?: LinkUpsertWithWhereUniqueWithoutClubInput[]
  set?: LinkWhereUniqueInput[]
  disconnect?: LinkWhereUniqueInput[]
  delete?: LinkWhereUniqueInput[]
  connect?: LinkWhereUniqueInput[]
  update?: LinkUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: LinkUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: LinkScalarWhereInput[]
}

export interface ClubApplicationInfoUncheckedUpdateOneWithoutClubInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutClubInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutClubInput
  upsert?: ClubApplicationInfoUpsertWithoutClubInput
  disconnect?: boolean
  delete?: boolean
  connect?: ClubApplicationInfoWhereUniqueInput
  update?: ClubApplicationInfoUncheckedUpdateWithoutClubInput
}

export interface TagUncheckedUpdateManyWithoutClubsInput {
  create?: TagCreateWithoutClubsInput[]
  connectOrCreate?: TagCreateOrConnectWithoutClubsInput[]
  upsert?: TagUpsertWithWhereUniqueWithoutClubsInput[]
  set?: TagWhereUniqueInput[]
  disconnect?: TagWhereUniqueInput[]
  delete?: TagWhereUniqueInput[]
  connect?: TagWhereUniqueInput[]
  update?: TagUpdateWithWhereUniqueWithoutClubsInput[]
  updateMany?: TagUpdateManyWithWhereWithoutClubsInput[]
  deleteMany?: TagScalarWhereInput[]
}

export interface UserUncheckedUpdateManyWithoutClubsInput {
  create?: UserCreateWithoutClubsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutClubsInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutClubsInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutClubsInput[]
  updateMany?: UserUpdateManyWithWhereWithoutClubsInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface UserUncheckedUpdateManyWithoutCanEditInput {
  create?: UserCreateWithoutCanEditInput[]
  connectOrCreate?: UserCreateOrConnectWithoutCanEditInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutCanEditInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutCanEditInput[]
  updateMany?: UserUpdateManyWithWhereWithoutCanEditInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface RoleUncheckedUpdateManyWithoutClubInput {
  create?: RoleCreateWithoutClubInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutClubInput[]
  upsert?: RoleUpsertWithWhereUniqueWithoutClubInput[]
  set?: RoleWhereUniqueInput[]
  disconnect?: RoleWhereUniqueInput[]
  delete?: RoleWhereUniqueInput[]
  connect?: RoleWhereUniqueInput[]
  update?: RoleUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: RoleUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: RoleScalarWhereInput[]
}

export interface InviteUncheckedUpdateManyWithoutClubInput {
  create?: InviteCreateWithoutClubInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutClubInput[]
  upsert?: InviteUpsertWithWhereUniqueWithoutClubInput[]
  set?: InviteWhereUniqueInput[]
  disconnect?: InviteWhereUniqueInput[]
  delete?: InviteWhereUniqueInput[]
  connect?: InviteWhereUniqueInput[]
  update?: InviteUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: InviteUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: InviteScalarWhereInput[]
}

export interface ClubCreateNestedOneWithoutLinksInput {
  create?: ClubUncheckedCreateWithoutLinksInput
  connectOrCreate?: ClubCreateOrConnectWithoutLinksInput
  connect?: ClubWhereUniqueInput
}

export interface ClubUpdateOneRequiredWithoutLinksInput {
  create?: ClubUncheckedCreateWithoutLinksInput
  connectOrCreate?: ClubCreateOrConnectWithoutLinksInput
  upsert?: ClubUpsertWithoutLinksInput
  connect?: ClubWhereUniqueInput
  update?: ClubUncheckedUpdateWithoutLinksInput
}

export interface StringFieldUpdateOperationsInput {
  set?: string
}

export interface UserCreateNestedOneWithoutAdvisorInput {
  create?: UserUncheckedCreateWithoutAdvisorInput
  connectOrCreate?: UserCreateOrConnectWithoutAdvisorInput
  connect?: UserWhereUniqueInput
}

export interface ClubCreateNestedOneWithoutApplicationInfoInput {
  create?: ClubUncheckedCreateWithoutApplicationInfoInput
  connectOrCreate?: ClubCreateOrConnectWithoutApplicationInfoInput
  connect?: ClubWhereUniqueInput
}

export interface ProjectedRevenueCreateNestedManyWithoutClubInput {
  create?: ProjectedRevenueCreateWithoutClubInput[]
  connectOrCreate?: ProjectedRevenueCreateOrConnectWithoutClubInput[]
  connect?: ProjectedRevenueWhereUniqueInput[]
}

export interface ProjectedExpensesCreateNestedManyWithoutClubInput {
  create?: ProjectedExpensesCreateWithoutClubInput[]
  connectOrCreate?: ProjectedExpensesCreateOrConnectWithoutClubInput[]
  connect?: ProjectedExpensesWhereUniqueInput[]
}

export interface ProjectedRevenueUncheckedCreateNestedManyWithoutClubInput {
  create?: ProjectedRevenueCreateWithoutClubInput[]
  connectOrCreate?: ProjectedRevenueCreateOrConnectWithoutClubInput[]
  connect?: ProjectedRevenueWhereUniqueInput[]
}

export interface ProjectedExpensesUncheckedCreateNestedManyWithoutClubInput {
  create?: ProjectedExpensesCreateWithoutClubInput[]
  connectOrCreate?: ProjectedExpensesCreateOrConnectWithoutClubInput[]
  connect?: ProjectedExpensesWhereUniqueInput[]
}

export interface UserUpdateOneRequiredWithoutAdvisorInput {
  create?: UserUncheckedCreateWithoutAdvisorInput
  connectOrCreate?: UserCreateOrConnectWithoutAdvisorInput
  upsert?: UserUpsertWithoutAdvisorInput
  connect?: UserWhereUniqueInput
  update?: UserUncheckedUpdateWithoutAdvisorInput
}

export interface ClubUpdateOneRequiredWithoutApplicationInfoInput {
  create?: ClubUncheckedCreateWithoutApplicationInfoInput
  connectOrCreate?: ClubCreateOrConnectWithoutApplicationInfoInput
  upsert?: ClubUpsertWithoutApplicationInfoInput
  connect?: ClubWhereUniqueInput
  update?: ClubUncheckedUpdateWithoutApplicationInfoInput
}

export interface ProjectedRevenueUpdateManyWithoutClubInput {
  create?: ProjectedRevenueCreateWithoutClubInput[]
  connectOrCreate?: ProjectedRevenueCreateOrConnectWithoutClubInput[]
  upsert?: ProjectedRevenueUpsertWithWhereUniqueWithoutClubInput[]
  set?: ProjectedRevenueWhereUniqueInput[]
  disconnect?: ProjectedRevenueWhereUniqueInput[]
  delete?: ProjectedRevenueWhereUniqueInput[]
  connect?: ProjectedRevenueWhereUniqueInput[]
  update?: ProjectedRevenueUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: ProjectedRevenueUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: ProjectedRevenueScalarWhereInput[]
}

export interface ProjectedExpensesUpdateManyWithoutClubInput {
  create?: ProjectedExpensesCreateWithoutClubInput[]
  connectOrCreate?: ProjectedExpensesCreateOrConnectWithoutClubInput[]
  upsert?: ProjectedExpensesUpsertWithWhereUniqueWithoutClubInput[]
  set?: ProjectedExpensesWhereUniqueInput[]
  disconnect?: ProjectedExpensesWhereUniqueInput[]
  delete?: ProjectedExpensesWhereUniqueInput[]
  connect?: ProjectedExpensesWhereUniqueInput[]
  update?: ProjectedExpensesUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: ProjectedExpensesUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: ProjectedExpensesScalarWhereInput[]
}

export interface FloatFieldUpdateOperationsInput {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export interface ProjectedRevenueUncheckedUpdateManyWithoutClubInput {
  create?: ProjectedRevenueCreateWithoutClubInput[]
  connectOrCreate?: ProjectedRevenueCreateOrConnectWithoutClubInput[]
  upsert?: ProjectedRevenueUpsertWithWhereUniqueWithoutClubInput[]
  set?: ProjectedRevenueWhereUniqueInput[]
  disconnect?: ProjectedRevenueWhereUniqueInput[]
  delete?: ProjectedRevenueWhereUniqueInput[]
  connect?: ProjectedRevenueWhereUniqueInput[]
  update?: ProjectedRevenueUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: ProjectedRevenueUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: ProjectedRevenueScalarWhereInput[]
}

export interface ProjectedExpensesUncheckedUpdateManyWithoutClubInput {
  create?: ProjectedExpensesCreateWithoutClubInput[]
  connectOrCreate?: ProjectedExpensesCreateOrConnectWithoutClubInput[]
  upsert?: ProjectedExpensesUpsertWithWhereUniqueWithoutClubInput[]
  set?: ProjectedExpensesWhereUniqueInput[]
  disconnect?: ProjectedExpensesWhereUniqueInput[]
  delete?: ProjectedExpensesWhereUniqueInput[]
  connect?: ProjectedExpensesWhereUniqueInput[]
  update?: ProjectedExpensesUpdateWithWhereUniqueWithoutClubInput[]
  updateMany?: ProjectedExpensesUpdateManyWithWhereWithoutClubInput[]
  deleteMany?: ProjectedExpensesScalarWhereInput[]
}

export interface ClubCreateNestedManyWithoutTagsInput {
  create?: ClubCreateWithoutTagsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutTagsInput[]
  connect?: ClubWhereUniqueInput[]
}

export interface UserCreateNestedManyWithoutInterestsInput {
  create?: UserCreateWithoutInterestsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutInterestsInput[]
  connect?: UserWhereUniqueInput[]
}

export interface ClubUncheckedCreateNestedManyWithoutTagsInput {
  create?: ClubCreateWithoutTagsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutTagsInput[]
  connect?: ClubWhereUniqueInput[]
}

export interface UserUncheckedCreateNestedManyWithoutInterestsInput {
  create?: UserCreateWithoutInterestsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutInterestsInput[]
  connect?: UserWhereUniqueInput[]
}

export interface ClubUpdateManyWithoutTagsInput {
  create?: ClubCreateWithoutTagsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutTagsInput[]
  upsert?: ClubUpsertWithWhereUniqueWithoutTagsInput[]
  set?: ClubWhereUniqueInput[]
  disconnect?: ClubWhereUniqueInput[]
  delete?: ClubWhereUniqueInput[]
  connect?: ClubWhereUniqueInput[]
  update?: ClubUpdateWithWhereUniqueWithoutTagsInput[]
  updateMany?: ClubUpdateManyWithWhereWithoutTagsInput[]
  deleteMany?: ClubScalarWhereInput[]
}

export interface UserUpdateManyWithoutInterestsInput {
  create?: UserCreateWithoutInterestsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutInterestsInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutInterestsInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutInterestsInput[]
  updateMany?: UserUpdateManyWithWhereWithoutInterestsInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface ClubUncheckedUpdateManyWithoutTagsInput {
  create?: ClubCreateWithoutTagsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutTagsInput[]
  upsert?: ClubUpsertWithWhereUniqueWithoutTagsInput[]
  set?: ClubWhereUniqueInput[]
  disconnect?: ClubWhereUniqueInput[]
  delete?: ClubWhereUniqueInput[]
  connect?: ClubWhereUniqueInput[]
  update?: ClubUpdateWithWhereUniqueWithoutTagsInput[]
  updateMany?: ClubUpdateManyWithWhereWithoutTagsInput[]
  deleteMany?: ClubScalarWhereInput[]
}

export interface UserUncheckedUpdateManyWithoutInterestsInput {
  create?: UserCreateWithoutInterestsInput[]
  connectOrCreate?: UserCreateOrConnectWithoutInterestsInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutInterestsInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutInterestsInput[]
  updateMany?: UserUpdateManyWithWhereWithoutInterestsInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface TagCreateNestedManyWithoutInterestedUsersInput {
  create?: TagCreateWithoutInterestedUsersInput[]
  connectOrCreate?: TagCreateOrConnectWithoutInterestedUsersInput[]
  connect?: TagWhereUniqueInput[]
}

export interface ClubCreateNestedManyWithoutMembersInput {
  create?: ClubCreateWithoutMembersInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutMembersInput[]
  connect?: ClubWhereUniqueInput[]
}

export interface ClubCreateNestedManyWithoutEditorsInput {
  create?: ClubCreateWithoutEditorsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutEditorsInput[]
  connect?: ClubWhereUniqueInput[]
}

export interface ClubApplicationInfoCreateNestedManyWithoutTeacherInput {
  create?: ClubApplicationInfoCreateWithoutTeacherInput[]
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutTeacherInput[]
  connect?: ClubApplicationInfoWhereUniqueInput[]
}

export interface RoleCreateNestedManyWithoutUsersInput {
  create?: RoleCreateWithoutUsersInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput[]
  connect?: RoleWhereUniqueInput[]
}

export interface InviteCreateNestedManyWithoutUserInput {
  create?: InviteCreateWithoutUserInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutUserInput[]
  connect?: InviteWhereUniqueInput[]
}

export interface TagUncheckedCreateNestedManyWithoutInterestedUsersInput {
  create?: TagCreateWithoutInterestedUsersInput[]
  connectOrCreate?: TagCreateOrConnectWithoutInterestedUsersInput[]
  connect?: TagWhereUniqueInput[]
}

export interface ClubUncheckedCreateNestedManyWithoutMembersInput {
  create?: ClubCreateWithoutMembersInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutMembersInput[]
  connect?: ClubWhereUniqueInput[]
}

export interface ClubUncheckedCreateNestedManyWithoutEditorsInput {
  create?: ClubCreateWithoutEditorsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutEditorsInput[]
  connect?: ClubWhereUniqueInput[]
}

export interface ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput {
  create?: ClubApplicationInfoCreateWithoutTeacherInput[]
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutTeacherInput[]
  connect?: ClubApplicationInfoWhereUniqueInput[]
}

export interface RoleUncheckedCreateNestedManyWithoutUsersInput {
  create?: RoleCreateWithoutUsersInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput[]
  connect?: RoleWhereUniqueInput[]
}

export interface InviteUncheckedCreateNestedManyWithoutUserInput {
  create?: InviteCreateWithoutUserInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutUserInput[]
  connect?: InviteWhereUniqueInput[]
}

export interface BoolFieldUpdateOperationsInput {
  set?: boolean
}

export interface TagUpdateManyWithoutInterestedUsersInput {
  create?: TagCreateWithoutInterestedUsersInput[]
  connectOrCreate?: TagCreateOrConnectWithoutInterestedUsersInput[]
  upsert?: TagUpsertWithWhereUniqueWithoutInterestedUsersInput[]
  set?: TagWhereUniqueInput[]
  disconnect?: TagWhereUniqueInput[]
  delete?: TagWhereUniqueInput[]
  connect?: TagWhereUniqueInput[]
  update?: TagUpdateWithWhereUniqueWithoutInterestedUsersInput[]
  updateMany?: TagUpdateManyWithWhereWithoutInterestedUsersInput[]
  deleteMany?: TagScalarWhereInput[]
}

export interface ClubUpdateManyWithoutMembersInput {
  create?: ClubCreateWithoutMembersInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutMembersInput[]
  upsert?: ClubUpsertWithWhereUniqueWithoutMembersInput[]
  set?: ClubWhereUniqueInput[]
  disconnect?: ClubWhereUniqueInput[]
  delete?: ClubWhereUniqueInput[]
  connect?: ClubWhereUniqueInput[]
  update?: ClubUpdateWithWhereUniqueWithoutMembersInput[]
  updateMany?: ClubUpdateManyWithWhereWithoutMembersInput[]
  deleteMany?: ClubScalarWhereInput[]
}

export interface ClubUpdateManyWithoutEditorsInput {
  create?: ClubCreateWithoutEditorsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutEditorsInput[]
  upsert?: ClubUpsertWithWhereUniqueWithoutEditorsInput[]
  set?: ClubWhereUniqueInput[]
  disconnect?: ClubWhereUniqueInput[]
  delete?: ClubWhereUniqueInput[]
  connect?: ClubWhereUniqueInput[]
  update?: ClubUpdateWithWhereUniqueWithoutEditorsInput[]
  updateMany?: ClubUpdateManyWithWhereWithoutEditorsInput[]
  deleteMany?: ClubScalarWhereInput[]
}

export interface ClubApplicationInfoUpdateManyWithoutTeacherInput {
  create?: ClubApplicationInfoCreateWithoutTeacherInput[]
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutTeacherInput[]
  upsert?: ClubApplicationInfoUpsertWithWhereUniqueWithoutTeacherInput[]
  set?: ClubApplicationInfoWhereUniqueInput[]
  disconnect?: ClubApplicationInfoWhereUniqueInput[]
  delete?: ClubApplicationInfoWhereUniqueInput[]
  connect?: ClubApplicationInfoWhereUniqueInput[]
  update?: ClubApplicationInfoUpdateWithWhereUniqueWithoutTeacherInput[]
  updateMany?: ClubApplicationInfoUpdateManyWithWhereWithoutTeacherInput[]
  deleteMany?: ClubApplicationInfoScalarWhereInput[]
}

export interface RoleUpdateManyWithoutUsersInput {
  create?: RoleCreateWithoutUsersInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput[]
  upsert?: RoleUpsertWithWhereUniqueWithoutUsersInput[]
  set?: RoleWhereUniqueInput[]
  disconnect?: RoleWhereUniqueInput[]
  delete?: RoleWhereUniqueInput[]
  connect?: RoleWhereUniqueInput[]
  update?: RoleUpdateWithWhereUniqueWithoutUsersInput[]
  updateMany?: RoleUpdateManyWithWhereWithoutUsersInput[]
  deleteMany?: RoleScalarWhereInput[]
}

export interface InviteUpdateManyWithoutUserInput {
  create?: InviteCreateWithoutUserInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutUserInput[]
  upsert?: InviteUpsertWithWhereUniqueWithoutUserInput[]
  set?: InviteWhereUniqueInput[]
  disconnect?: InviteWhereUniqueInput[]
  delete?: InviteWhereUniqueInput[]
  connect?: InviteWhereUniqueInput[]
  update?: InviteUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: InviteUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: InviteScalarWhereInput[]
}

export interface TagUncheckedUpdateManyWithoutInterestedUsersInput {
  create?: TagCreateWithoutInterestedUsersInput[]
  connectOrCreate?: TagCreateOrConnectWithoutInterestedUsersInput[]
  upsert?: TagUpsertWithWhereUniqueWithoutInterestedUsersInput[]
  set?: TagWhereUniqueInput[]
  disconnect?: TagWhereUniqueInput[]
  delete?: TagWhereUniqueInput[]
  connect?: TagWhereUniqueInput[]
  update?: TagUpdateWithWhereUniqueWithoutInterestedUsersInput[]
  updateMany?: TagUpdateManyWithWhereWithoutInterestedUsersInput[]
  deleteMany?: TagScalarWhereInput[]
}

export interface ClubUncheckedUpdateManyWithoutMembersInput {
  create?: ClubCreateWithoutMembersInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutMembersInput[]
  upsert?: ClubUpsertWithWhereUniqueWithoutMembersInput[]
  set?: ClubWhereUniqueInput[]
  disconnect?: ClubWhereUniqueInput[]
  delete?: ClubWhereUniqueInput[]
  connect?: ClubWhereUniqueInput[]
  update?: ClubUpdateWithWhereUniqueWithoutMembersInput[]
  updateMany?: ClubUpdateManyWithWhereWithoutMembersInput[]
  deleteMany?: ClubScalarWhereInput[]
}

export interface ClubUncheckedUpdateManyWithoutEditorsInput {
  create?: ClubCreateWithoutEditorsInput[]
  connectOrCreate?: ClubCreateOrConnectWithoutEditorsInput[]
  upsert?: ClubUpsertWithWhereUniqueWithoutEditorsInput[]
  set?: ClubWhereUniqueInput[]
  disconnect?: ClubWhereUniqueInput[]
  delete?: ClubWhereUniqueInput[]
  connect?: ClubWhereUniqueInput[]
  update?: ClubUpdateWithWhereUniqueWithoutEditorsInput[]
  updateMany?: ClubUpdateManyWithWhereWithoutEditorsInput[]
  deleteMany?: ClubScalarWhereInput[]
}

export interface ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput {
  create?: ClubApplicationInfoCreateWithoutTeacherInput[]
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutTeacherInput[]
  upsert?: ClubApplicationInfoUpsertWithWhereUniqueWithoutTeacherInput[]
  set?: ClubApplicationInfoWhereUniqueInput[]
  disconnect?: ClubApplicationInfoWhereUniqueInput[]
  delete?: ClubApplicationInfoWhereUniqueInput[]
  connect?: ClubApplicationInfoWhereUniqueInput[]
  update?: ClubApplicationInfoUpdateWithWhereUniqueWithoutTeacherInput[]
  updateMany?: ClubApplicationInfoUpdateManyWithWhereWithoutTeacherInput[]
  deleteMany?: ClubApplicationInfoScalarWhereInput[]
}

export interface RoleUncheckedUpdateManyWithoutUsersInput {
  create?: RoleCreateWithoutUsersInput[]
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput[]
  upsert?: RoleUpsertWithWhereUniqueWithoutUsersInput[]
  set?: RoleWhereUniqueInput[]
  disconnect?: RoleWhereUniqueInput[]
  delete?: RoleWhereUniqueInput[]
  connect?: RoleWhereUniqueInput[]
  update?: RoleUpdateWithWhereUniqueWithoutUsersInput[]
  updateMany?: RoleUpdateManyWithWhereWithoutUsersInput[]
  deleteMany?: RoleScalarWhereInput[]
}

export interface InviteUncheckedUpdateManyWithoutUserInput {
  create?: InviteCreateWithoutUserInput[]
  connectOrCreate?: InviteCreateOrConnectWithoutUserInput[]
  upsert?: InviteUpsertWithWhereUniqueWithoutUserInput[]
  set?: InviteWhereUniqueInput[]
  disconnect?: InviteWhereUniqueInput[]
  delete?: InviteWhereUniqueInput[]
  connect?: InviteWhereUniqueInput[]
  update?: InviteUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: InviteUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: InviteScalarWhereInput[]
}

export interface ClubCreateNestedOneWithoutInvitesInput {
  create?: ClubUncheckedCreateWithoutInvitesInput
  connectOrCreate?: ClubCreateOrConnectWithoutInvitesInput
  connect?: ClubWhereUniqueInput
}

export interface UserCreateNestedOneWithoutInvitesInput {
  create?: UserUncheckedCreateWithoutInvitesInput
  connectOrCreate?: UserCreateOrConnectWithoutInvitesInput
  connect?: UserWhereUniqueInput
}

export interface ClubUpdateOneRequiredWithoutInvitesInput {
  create?: ClubUncheckedCreateWithoutInvitesInput
  connectOrCreate?: ClubCreateOrConnectWithoutInvitesInput
  upsert?: ClubUpsertWithoutInvitesInput
  connect?: ClubWhereUniqueInput
  update?: ClubUncheckedUpdateWithoutInvitesInput
}

export interface UserUpdateOneRequiredWithoutInvitesInput {
  create?: UserUncheckedCreateWithoutInvitesInput
  connectOrCreate?: UserCreateOrConnectWithoutInvitesInput
  upsert?: UserUpsertWithoutInvitesInput
  connect?: UserWhereUniqueInput
  update?: UserUncheckedUpdateWithoutInvitesInput
}

export interface UserCreateNestedManyWithoutRolesInput {
  create?: UserCreateWithoutRolesInput[]
  connectOrCreate?: UserCreateOrConnectWithoutRolesInput[]
  connect?: UserWhereUniqueInput[]
}

export interface ClubCreateNestedOneWithoutRolesInput {
  create?: ClubUncheckedCreateWithoutRolesInput
  connectOrCreate?: ClubCreateOrConnectWithoutRolesInput
  connect?: ClubWhereUniqueInput
}

export interface UserUncheckedCreateNestedManyWithoutRolesInput {
  create?: UserCreateWithoutRolesInput[]
  connectOrCreate?: UserCreateOrConnectWithoutRolesInput[]
  connect?: UserWhereUniqueInput[]
}

export interface UserUpdateManyWithoutRolesInput {
  create?: UserCreateWithoutRolesInput[]
  connectOrCreate?: UserCreateOrConnectWithoutRolesInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutRolesInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutRolesInput[]
  updateMany?: UserUpdateManyWithWhereWithoutRolesInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface ClubUpdateOneRequiredWithoutRolesInput {
  create?: ClubUncheckedCreateWithoutRolesInput
  connectOrCreate?: ClubCreateOrConnectWithoutRolesInput
  upsert?: ClubUpsertWithoutRolesInput
  connect?: ClubWhereUniqueInput
  update?: ClubUncheckedUpdateWithoutRolesInput
}

export interface UserUncheckedUpdateManyWithoutRolesInput {
  create?: UserCreateWithoutRolesInput[]
  connectOrCreate?: UserCreateOrConnectWithoutRolesInput[]
  upsert?: UserUpsertWithWhereUniqueWithoutRolesInput[]
  set?: UserWhereUniqueInput[]
  disconnect?: UserWhereUniqueInput[]
  delete?: UserWhereUniqueInput[]
  connect?: UserWhereUniqueInput[]
  update?: UserUpdateWithWhereUniqueWithoutRolesInput[]
  updateMany?: UserUpdateManyWithWhereWithoutRolesInput[]
  deleteMany?: UserScalarWhereInput[]
}

export interface ClubApplicationInfoCreateNestedOneWithoutProjectedRevenueInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutProjectedRevenueInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutProjectedRevenueInput
  connect?: ClubApplicationInfoWhereUniqueInput
}

export interface ClubApplicationInfoUpdateOneRequiredWithoutProjectedRevenueInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutProjectedRevenueInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutProjectedRevenueInput
  upsert?: ClubApplicationInfoUpsertWithoutProjectedRevenueInput
  connect?: ClubApplicationInfoWhereUniqueInput
  update?: ClubApplicationInfoUncheckedUpdateWithoutProjectedRevenueInput
}

export interface ClubApplicationInfoCreateNestedOneWithoutProjectedExpensesInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutProjectedExpensesInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutProjectedExpensesInput
  connect?: ClubApplicationInfoWhereUniqueInput
}

export interface ClubApplicationInfoUpdateOneRequiredWithoutProjectedExpensesInput {
  create?: ClubApplicationInfoUncheckedCreateWithoutProjectedExpensesInput
  connectOrCreate?: ClubApplicationInfoCreateOrConnectWithoutProjectedExpensesInput
  upsert?: ClubApplicationInfoUpsertWithoutProjectedExpensesInput
  connect?: ClubApplicationInfoWhereUniqueInput
  update?: ClubApplicationInfoUncheckedUpdateWithoutProjectedExpensesInput
}

export interface NestedIntFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter
}

export interface NestedStringNullableFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringNullableFilter | null
}

export interface NestedIntWithAggregatesFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntWithAggregatesFilter
  _count?: NestedIntFilter
  _avg?: NestedFloatFilter
  _sum?: NestedIntFilter
  _min?: NestedIntFilter
  _max?: NestedIntFilter
}

export interface NestedFloatFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatFilter
}

export interface NestedStringNullableWithAggregatesFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringNullableWithAggregatesFilter | null
  _count?: NestedIntNullableFilter
  _min?: NestedStringNullableFilter
  _max?: NestedStringNullableFilter
}

export interface NestedIntNullableFilter {
  equals?: number | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntNullableFilter | null
}

export interface NestedStringFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter
}

export interface NestedStringWithAggregatesFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringWithAggregatesFilter
  _count?: NestedIntFilter
  _min?: NestedStringFilter
  _max?: NestedStringFilter
}

export interface NestedFloatWithAggregatesFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedFloatWithAggregatesFilter
  _count?: NestedIntFilter
  _avg?: NestedFloatFilter
  _sum?: NestedFloatFilter
  _min?: NestedFloatFilter
  _max?: NestedFloatFilter
}

export interface NestedBoolFilter {
  equals?: boolean
  not?: NestedBoolFilter
}

export interface NestedBoolWithAggregatesFilter {
  equals?: boolean
  not?: NestedBoolWithAggregatesFilter
  _count?: NestedIntFilter
  _min?: NestedBoolFilter
  _max?: NestedBoolFilter
}

export interface LinkCreateWithoutClubInput {
  name?: string | null
  link: string
  type: string
}

export interface LinkUncheckedCreateWithoutClubInput {
  id?: number
  name?: string | null
  link: string
  type: string
}

export interface LinkCreateOrConnectWithoutClubInput {
  where: LinkWhereUniqueInput
  create: LinkUncheckedCreateWithoutClubInput
}

export interface ClubApplicationInfoCreateWithoutClubInput {
  teacher: UserCreateNestedOneWithoutAdvisorInput
  projectedRevenue?: ProjectedRevenueCreateNestedManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoUncheckedCreateWithoutClubInput {
  id?: number
  userId: number
  projectedRevenue?: ProjectedRevenueUncheckedCreateNestedManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUncheckedCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoCreateOrConnectWithoutClubInput {
  where: ClubApplicationInfoWhereUniqueInput
  create: ClubApplicationInfoUncheckedCreateWithoutClubInput
}

export interface TagCreateWithoutClubsInput {
  name: string
  interestedUsers?: UserCreateNestedManyWithoutInterestsInput
}

export interface TagUncheckedCreateWithoutClubsInput {
  id?: number
  name: string
  interestedUsers?: UserUncheckedCreateNestedManyWithoutInterestsInput
}

export interface TagCreateOrConnectWithoutClubsInput {
  where: TagWhereUniqueInput
  create: TagUncheckedCreateWithoutClubsInput
}

export interface UserCreateWithoutClubsInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagCreateNestedManyWithoutInterestedUsersInput
  canEdit?: ClubCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoCreateNestedManyWithoutTeacherInput
  roles?: RoleCreateNestedManyWithoutUsersInput
  invites?: InviteCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateWithoutClubsInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagUncheckedCreateNestedManyWithoutInterestedUsersInput
  canEdit?: ClubUncheckedCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput
  roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  invites?: InviteUncheckedCreateNestedManyWithoutUserInput
}

export interface UserCreateOrConnectWithoutClubsInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutClubsInput
}

export interface UserCreateWithoutCanEditInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubCreateNestedManyWithoutMembersInput
  advisor?: ClubApplicationInfoCreateNestedManyWithoutTeacherInput
  roles?: RoleCreateNestedManyWithoutUsersInput
  invites?: InviteCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateWithoutCanEditInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagUncheckedCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedCreateNestedManyWithoutMembersInput
  advisor?: ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput
  roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  invites?: InviteUncheckedCreateNestedManyWithoutUserInput
}

export interface UserCreateOrConnectWithoutCanEditInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutCanEditInput
}

export interface RoleCreateWithoutClubInput {
  name: string
  color: string
  description: string
  users?: UserCreateNestedManyWithoutRolesInput
  type?: string
}

export interface RoleUncheckedCreateWithoutClubInput {
  id?: number
  name: string
  color: string
  description: string
  users?: UserUncheckedCreateNestedManyWithoutRolesInput
  type?: string
}

export interface RoleCreateOrConnectWithoutClubInput {
  where: RoleWhereUniqueInput
  create: RoleUncheckedCreateWithoutClubInput
}

export interface InviteCreateWithoutClubInput {
  status?: string
  user: UserCreateNestedOneWithoutInvitesInput
}

export interface InviteUncheckedCreateWithoutClubInput {
  id?: number
  status?: string
  userId: number
}

export interface InviteCreateOrConnectWithoutClubInput {
  where: InviteWhereUniqueInput
  create: InviteUncheckedCreateWithoutClubInput
}

export interface LinkUpsertWithWhereUniqueWithoutClubInput {
  where: LinkWhereUniqueInput
  update: LinkUncheckedUpdateWithoutClubInput
  create: LinkUncheckedCreateWithoutClubInput
}

export interface LinkUpdateWithWhereUniqueWithoutClubInput {
  where: LinkWhereUniqueInput
  data: LinkUncheckedUpdateWithoutClubInput
}

export interface LinkUpdateManyWithWhereWithoutClubInput {
  where: LinkScalarWhereInput
  data: LinkUncheckedUpdateManyWithoutLinksInput
}

export interface LinkScalarWhereInput {
  AND?: LinkScalarWhereInput[]
  OR?: LinkScalarWhereInput[]
  NOT?: LinkScalarWhereInput[]
  id?: IntFilter
  clubId?: IntFilter
  name?: StringNullableFilter | null
  link?: StringFilter
  type?: StringFilter
}

export interface ClubApplicationInfoUpsertWithoutClubInput {
  update: ClubApplicationInfoUncheckedUpdateWithoutClubInput
  create: ClubApplicationInfoUncheckedCreateWithoutClubInput
}

export interface ClubApplicationInfoUpdateWithoutClubInput {
  teacher?: UserUpdateOneRequiredWithoutAdvisorInput
  projectedRevenue?: ProjectedRevenueUpdateManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateWithoutClubInput {
  id?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
  projectedRevenue?: ProjectedRevenueUncheckedUpdateManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUncheckedUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface TagUpsertWithWhereUniqueWithoutClubsInput {
  where: TagWhereUniqueInput
  update: TagUncheckedUpdateWithoutClubsInput
  create: TagUncheckedCreateWithoutClubsInput
}

export interface TagUpdateWithWhereUniqueWithoutClubsInput {
  where: TagWhereUniqueInput
  data: TagUncheckedUpdateWithoutClubsInput
}

export interface TagUpdateManyWithWhereWithoutClubsInput {
  where: TagScalarWhereInput
  data: TagUncheckedUpdateManyWithoutTagsInput
}

export interface TagScalarWhereInput {
  AND?: TagScalarWhereInput[]
  OR?: TagScalarWhereInput[]
  NOT?: TagScalarWhereInput[]
  id?: IntFilter
  name?: StringFilter
}

export interface UserUpsertWithWhereUniqueWithoutClubsInput {
  where: UserWhereUniqueInput
  update: UserUncheckedUpdateWithoutClubsInput
  create: UserUncheckedCreateWithoutClubsInput
}

export interface UserUpdateWithWhereUniqueWithoutClubsInput {
  where: UserWhereUniqueInput
  data: UserUncheckedUpdateWithoutClubsInput
}

export interface UserUpdateManyWithWhereWithoutClubsInput {
  where: UserScalarWhereInput
  data: UserUncheckedUpdateManyWithoutMembersInput
}

export interface UserScalarWhereInput {
  AND?: UserScalarWhereInput[]
  OR?: UserScalarWhereInput[]
  NOT?: UserScalarWhereInput[]
  id?: IntFilter
  ccid?: StringFilter
  firstname?: StringFilter
  lastname?: StringFilter
  email?: StringFilter
  emailVerified?: BoolFilter
  password?: StringFilter
  grade?: StringFilter
  type?: StringFilter
}

export interface UserUpsertWithWhereUniqueWithoutCanEditInput {
  where: UserWhereUniqueInput
  update: UserUncheckedUpdateWithoutCanEditInput
  create: UserUncheckedCreateWithoutCanEditInput
}

export interface UserUpdateWithWhereUniqueWithoutCanEditInput {
  where: UserWhereUniqueInput
  data: UserUncheckedUpdateWithoutCanEditInput
}

export interface UserUpdateManyWithWhereWithoutCanEditInput {
  where: UserScalarWhereInput
  data: UserUncheckedUpdateManyWithoutEditorsInput
}

export interface RoleUpsertWithWhereUniqueWithoutClubInput {
  where: RoleWhereUniqueInput
  update: RoleUncheckedUpdateWithoutClubInput
  create: RoleUncheckedCreateWithoutClubInput
}

export interface RoleUpdateWithWhereUniqueWithoutClubInput {
  where: RoleWhereUniqueInput
  data: RoleUncheckedUpdateWithoutClubInput
}

export interface RoleUpdateManyWithWhereWithoutClubInput {
  where: RoleScalarWhereInput
  data: RoleUncheckedUpdateManyWithoutRolesInput
}

export interface RoleScalarWhereInput {
  AND?: RoleScalarWhereInput[]
  OR?: RoleScalarWhereInput[]
  NOT?: RoleScalarWhereInput[]
  id?: IntFilter
  name?: StringFilter
  color?: StringFilter
  description?: StringFilter
  clubId?: IntFilter
  type?: StringFilter
}

export interface InviteUpsertWithWhereUniqueWithoutClubInput {
  where: InviteWhereUniqueInput
  update: InviteUncheckedUpdateWithoutClubInput
  create: InviteUncheckedCreateWithoutClubInput
}

export interface InviteUpdateWithWhereUniqueWithoutClubInput {
  where: InviteWhereUniqueInput
  data: InviteUncheckedUpdateWithoutClubInput
}

export interface InviteUpdateManyWithWhereWithoutClubInput {
  where: InviteScalarWhereInput
  data: InviteUncheckedUpdateManyWithoutInvitesInput
}

export interface InviteScalarWhereInput {
  AND?: InviteScalarWhereInput[]
  OR?: InviteScalarWhereInput[]
  NOT?: InviteScalarWhereInput[]
  id?: IntFilter
  status?: StringFilter
  clubId?: IntFilter
  userId?: IntFilter
}

export interface ClubCreateWithoutLinksInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  members?: UserCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  roles?: RoleCreateNestedManyWithoutClubInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutLinksInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutLinksInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutLinksInput
}

export interface ClubUpsertWithoutLinksInput {
  update: ClubUncheckedUpdateWithoutLinksInput
  create: ClubUncheckedCreateWithoutLinksInput
}

export interface ClubUpdateWithoutLinksInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  members?: UserUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  roles?: RoleUpdateManyWithoutClubInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutLinksInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface UserCreateWithoutAdvisorInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubCreateNestedManyWithoutMembersInput
  canEdit?: ClubCreateNestedManyWithoutEditorsInput
  roles?: RoleCreateNestedManyWithoutUsersInput
  invites?: InviteCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateWithoutAdvisorInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagUncheckedCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedCreateNestedManyWithoutMembersInput
  canEdit?: ClubUncheckedCreateNestedManyWithoutEditorsInput
  roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  invites?: InviteUncheckedCreateNestedManyWithoutUserInput
}

export interface UserCreateOrConnectWithoutAdvisorInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutAdvisorInput
}

export interface ClubCreateWithoutApplicationInfoInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  members?: UserCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  roles?: RoleCreateNestedManyWithoutClubInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutApplicationInfoInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutApplicationInfoInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutApplicationInfoInput
}

export interface ProjectedRevenueCreateWithoutClubInput {
  name: string
  amount: number
  date: string
}

export interface ProjectedRevenueUncheckedCreateWithoutClubInput {
  id?: number
  name: string
  amount: number
  date: string
}

export interface ProjectedRevenueCreateOrConnectWithoutClubInput {
  where: ProjectedRevenueWhereUniqueInput
  create: ProjectedRevenueUncheckedCreateWithoutClubInput
}

export interface ProjectedExpensesCreateWithoutClubInput {
  name: string
  amount: number
  date: string
}

export interface ProjectedExpensesUncheckedCreateWithoutClubInput {
  id?: number
  name: string
  amount: number
  date: string
}

export interface ProjectedExpensesCreateOrConnectWithoutClubInput {
  where: ProjectedExpensesWhereUniqueInput
  create: ProjectedExpensesUncheckedCreateWithoutClubInput
}

export interface UserUpsertWithoutAdvisorInput {
  update: UserUncheckedUpdateWithoutAdvisorInput
  create: UserUncheckedCreateWithoutAdvisorInput
}

export interface UserUpdateWithoutAdvisorInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUpdateManyWithoutMembersInput
  canEdit?: ClubUpdateManyWithoutEditorsInput
  roles?: RoleUpdateManyWithoutUsersInput
  invites?: InviteUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateWithoutAdvisorInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUncheckedUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedUpdateManyWithoutMembersInput
  canEdit?: ClubUncheckedUpdateManyWithoutEditorsInput
  roles?: RoleUncheckedUpdateManyWithoutUsersInput
  invites?: InviteUncheckedUpdateManyWithoutUserInput
}

export interface ClubUpsertWithoutApplicationInfoInput {
  update: ClubUncheckedUpdateWithoutApplicationInfoInput
  create: ClubUncheckedCreateWithoutApplicationInfoInput
}

export interface ClubUpdateWithoutApplicationInfoInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  members?: UserUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  roles?: RoleUpdateManyWithoutClubInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutApplicationInfoInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface ProjectedRevenueUpsertWithWhereUniqueWithoutClubInput {
  where: ProjectedRevenueWhereUniqueInput
  update: ProjectedRevenueUncheckedUpdateWithoutClubInput
  create: ProjectedRevenueUncheckedCreateWithoutClubInput
}

export interface ProjectedRevenueUpdateWithWhereUniqueWithoutClubInput {
  where: ProjectedRevenueWhereUniqueInput
  data: ProjectedRevenueUncheckedUpdateWithoutClubInput
}

export interface ProjectedRevenueUpdateManyWithWhereWithoutClubInput {
  where: ProjectedRevenueScalarWhereInput
  data: ProjectedRevenueUncheckedUpdateManyWithoutProjectedRevenueInput
}

export interface ProjectedRevenueScalarWhereInput {
  AND?: ProjectedRevenueScalarWhereInput[]
  OR?: ProjectedRevenueScalarWhereInput[]
  NOT?: ProjectedRevenueScalarWhereInput[]
  id?: IntFilter
  clubId?: IntFilter
  name?: StringFilter
  amount?: FloatFilter
  date?: StringFilter
}

export interface ProjectedExpensesUpsertWithWhereUniqueWithoutClubInput {
  where: ProjectedExpensesWhereUniqueInput
  update: ProjectedExpensesUncheckedUpdateWithoutClubInput
  create: ProjectedExpensesUncheckedCreateWithoutClubInput
}

export interface ProjectedExpensesUpdateWithWhereUniqueWithoutClubInput {
  where: ProjectedExpensesWhereUniqueInput
  data: ProjectedExpensesUncheckedUpdateWithoutClubInput
}

export interface ProjectedExpensesUpdateManyWithWhereWithoutClubInput {
  where: ProjectedExpensesScalarWhereInput
  data: ProjectedExpensesUncheckedUpdateManyWithoutProjectedExpensesInput
}

export interface ProjectedExpensesScalarWhereInput {
  AND?: ProjectedExpensesScalarWhereInput[]
  OR?: ProjectedExpensesScalarWhereInput[]
  NOT?: ProjectedExpensesScalarWhereInput[]
  id?: IntFilter
  clubId?: IntFilter
  name?: StringFilter
  amount?: FloatFilter
  date?: StringFilter
}

export interface ClubCreateWithoutTagsInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  members?: UserCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  roles?: RoleCreateNestedManyWithoutClubInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutTagsInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutTagsInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutTagsInput
}

export interface UserCreateWithoutInterestsInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  clubs?: ClubCreateNestedManyWithoutMembersInput
  canEdit?: ClubCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoCreateNestedManyWithoutTeacherInput
  roles?: RoleCreateNestedManyWithoutUsersInput
  invites?: InviteCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateWithoutInterestsInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  clubs?: ClubUncheckedCreateNestedManyWithoutMembersInput
  canEdit?: ClubUncheckedCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput
  roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
  invites?: InviteUncheckedCreateNestedManyWithoutUserInput
}

export interface UserCreateOrConnectWithoutInterestsInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutInterestsInput
}

export interface ClubUpsertWithWhereUniqueWithoutTagsInput {
  where: ClubWhereUniqueInput
  update: ClubUncheckedUpdateWithoutTagsInput
  create: ClubUncheckedCreateWithoutTagsInput
}

export interface ClubUpdateWithWhereUniqueWithoutTagsInput {
  where: ClubWhereUniqueInput
  data: ClubUncheckedUpdateWithoutTagsInput
}

export interface ClubUpdateManyWithWhereWithoutTagsInput {
  where: ClubScalarWhereInput
  data: ClubUncheckedUpdateManyWithoutClubsInput
}

export interface ClubScalarWhereInput {
  AND?: ClubScalarWhereInput[]
  OR?: ClubScalarWhereInput[]
  NOT?: ClubScalarWhereInput[]
  id?: IntFilter
  name?: StringNullableFilter | null
  slug?: StringNullableFilter | null
  description?: StringNullableFilter | null
  email?: StringNullableFilter | null
  meetingDate?: StringNullableFilter | null
  location?: StringNullableFilter | null
  approval?: StringNullableFilter | null
  status?: StringNullableFilter | null
  availability?: StringNullableFilter | null
}

export interface UserUpsertWithWhereUniqueWithoutInterestsInput {
  where: UserWhereUniqueInput
  update: UserUncheckedUpdateWithoutInterestsInput
  create: UserUncheckedCreateWithoutInterestsInput
}

export interface UserUpdateWithWhereUniqueWithoutInterestsInput {
  where: UserWhereUniqueInput
  data: UserUncheckedUpdateWithoutInterestsInput
}

export interface UserUpdateManyWithWhereWithoutInterestsInput {
  where: UserScalarWhereInput
  data: UserUncheckedUpdateManyWithoutInterestedUsersInput
}

export interface TagCreateWithoutInterestedUsersInput {
  name: string
  clubs?: ClubCreateNestedManyWithoutTagsInput
}

export interface TagUncheckedCreateWithoutInterestedUsersInput {
  id?: number
  name: string
  clubs?: ClubUncheckedCreateNestedManyWithoutTagsInput
}

export interface TagCreateOrConnectWithoutInterestedUsersInput {
  where: TagWhereUniqueInput
  create: TagUncheckedCreateWithoutInterestedUsersInput
}

export interface ClubCreateWithoutMembersInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  roles?: RoleCreateNestedManyWithoutClubInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutMembersInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutMembersInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutMembersInput
}

export interface ClubCreateWithoutEditorsInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  members?: UserCreateNestedManyWithoutClubsInput
  roles?: RoleCreateNestedManyWithoutClubInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutEditorsInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutEditorsInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutEditorsInput
}

export interface ClubApplicationInfoCreateWithoutTeacherInput {
  club: ClubCreateNestedOneWithoutApplicationInfoInput
  projectedRevenue?: ProjectedRevenueCreateNestedManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoUncheckedCreateWithoutTeacherInput {
  id?: number
  clubId: number
  projectedRevenue?: ProjectedRevenueUncheckedCreateNestedManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUncheckedCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoCreateOrConnectWithoutTeacherInput {
  where: ClubApplicationInfoWhereUniqueInput
  create: ClubApplicationInfoUncheckedCreateWithoutTeacherInput
}

export interface RoleCreateWithoutUsersInput {
  name: string
  color: string
  description: string
  club: ClubCreateNestedOneWithoutRolesInput
  type?: string
}

export interface RoleUncheckedCreateWithoutUsersInput {
  id?: number
  name: string
  color: string
  description: string
  clubId: number
  type?: string
}

export interface RoleCreateOrConnectWithoutUsersInput {
  where: RoleWhereUniqueInput
  create: RoleUncheckedCreateWithoutUsersInput
}

export interface InviteCreateWithoutUserInput {
  status?: string
  club: ClubCreateNestedOneWithoutInvitesInput
}

export interface InviteUncheckedCreateWithoutUserInput {
  id?: number
  status?: string
  clubId: number
}

export interface InviteCreateOrConnectWithoutUserInput {
  where: InviteWhereUniqueInput
  create: InviteUncheckedCreateWithoutUserInput
}

export interface TagUpsertWithWhereUniqueWithoutInterestedUsersInput {
  where: TagWhereUniqueInput
  update: TagUncheckedUpdateWithoutInterestedUsersInput
  create: TagUncheckedCreateWithoutInterestedUsersInput
}

export interface TagUpdateWithWhereUniqueWithoutInterestedUsersInput {
  where: TagWhereUniqueInput
  data: TagUncheckedUpdateWithoutInterestedUsersInput
}

export interface TagUpdateManyWithWhereWithoutInterestedUsersInput {
  where: TagScalarWhereInput
  data: TagUncheckedUpdateManyWithoutInterestsInput
}

export interface ClubUpsertWithWhereUniqueWithoutMembersInput {
  where: ClubWhereUniqueInput
  update: ClubUncheckedUpdateWithoutMembersInput
  create: ClubUncheckedCreateWithoutMembersInput
}

export interface ClubUpdateWithWhereUniqueWithoutMembersInput {
  where: ClubWhereUniqueInput
  data: ClubUncheckedUpdateWithoutMembersInput
}

export interface ClubUpdateManyWithWhereWithoutMembersInput {
  where: ClubScalarWhereInput
  data: ClubUncheckedUpdateManyWithoutClubsInput
}

export interface ClubUpsertWithWhereUniqueWithoutEditorsInput {
  where: ClubWhereUniqueInput
  update: ClubUncheckedUpdateWithoutEditorsInput
  create: ClubUncheckedCreateWithoutEditorsInput
}

export interface ClubUpdateWithWhereUniqueWithoutEditorsInput {
  where: ClubWhereUniqueInput
  data: ClubUncheckedUpdateWithoutEditorsInput
}

export interface ClubUpdateManyWithWhereWithoutEditorsInput {
  where: ClubScalarWhereInput
  data: ClubUncheckedUpdateManyWithoutCanEditInput
}

export interface ClubApplicationInfoUpsertWithWhereUniqueWithoutTeacherInput {
  where: ClubApplicationInfoWhereUniqueInput
  update: ClubApplicationInfoUncheckedUpdateWithoutTeacherInput
  create: ClubApplicationInfoUncheckedCreateWithoutTeacherInput
}

export interface ClubApplicationInfoUpdateWithWhereUniqueWithoutTeacherInput {
  where: ClubApplicationInfoWhereUniqueInput
  data: ClubApplicationInfoUncheckedUpdateWithoutTeacherInput
}

export interface ClubApplicationInfoUpdateManyWithWhereWithoutTeacherInput {
  where: ClubApplicationInfoScalarWhereInput
  data: ClubApplicationInfoUncheckedUpdateManyWithoutAdvisorInput
}

export interface ClubApplicationInfoScalarWhereInput {
  AND?: ClubApplicationInfoScalarWhereInput[]
  OR?: ClubApplicationInfoScalarWhereInput[]
  NOT?: ClubApplicationInfoScalarWhereInput[]
  id?: IntFilter
  userId?: IntFilter
  clubId?: IntFilter
  purpose?: StringFilter
  membershipRequirements?: StringFilter
  dutiesOfMembers?: StringFilter
  titlesAndDutiesOfOfficers?: StringFilter
  selectionOfOfficers?: StringFilter
  officerMinimumGPA?: FloatFilter
  percentAttendanceForOfficialMeeting?: IntFilter
  percentAttendanceToApproveDecision?: IntFilter
}

export interface RoleUpsertWithWhereUniqueWithoutUsersInput {
  where: RoleWhereUniqueInput
  update: RoleUncheckedUpdateWithoutUsersInput
  create: RoleUncheckedCreateWithoutUsersInput
}

export interface RoleUpdateWithWhereUniqueWithoutUsersInput {
  where: RoleWhereUniqueInput
  data: RoleUncheckedUpdateWithoutUsersInput
}

export interface RoleUpdateManyWithWhereWithoutUsersInput {
  where: RoleScalarWhereInput
  data: RoleUncheckedUpdateManyWithoutRolesInput
}

export interface InviteUpsertWithWhereUniqueWithoutUserInput {
  where: InviteWhereUniqueInput
  update: InviteUncheckedUpdateWithoutUserInput
  create: InviteUncheckedCreateWithoutUserInput
}

export interface InviteUpdateWithWhereUniqueWithoutUserInput {
  where: InviteWhereUniqueInput
  data: InviteUncheckedUpdateWithoutUserInput
}

export interface InviteUpdateManyWithWhereWithoutUserInput {
  where: InviteScalarWhereInput
  data: InviteUncheckedUpdateManyWithoutInvitesInput
}

export interface ClubCreateWithoutInvitesInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  members?: UserCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  roles?: RoleCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutInvitesInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  roles?: RoleUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutInvitesInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutInvitesInput
}

export interface UserCreateWithoutInvitesInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubCreateNestedManyWithoutMembersInput
  canEdit?: ClubCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoCreateNestedManyWithoutTeacherInput
  roles?: RoleCreateNestedManyWithoutUsersInput
}

export interface UserUncheckedCreateWithoutInvitesInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagUncheckedCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedCreateNestedManyWithoutMembersInput
  canEdit?: ClubUncheckedCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput
  roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
}

export interface UserCreateOrConnectWithoutInvitesInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutInvitesInput
}

export interface ClubUpsertWithoutInvitesInput {
  update: ClubUncheckedUpdateWithoutInvitesInput
  create: ClubUncheckedCreateWithoutInvitesInput
}

export interface ClubUpdateWithoutInvitesInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  members?: UserUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  roles?: RoleUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutInvitesInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
}

export interface UserUpsertWithoutInvitesInput {
  update: UserUncheckedUpdateWithoutInvitesInput
  create: UserUncheckedCreateWithoutInvitesInput
}

export interface UserUpdateWithoutInvitesInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUpdateManyWithoutMembersInput
  canEdit?: ClubUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUpdateManyWithoutTeacherInput
  roles?: RoleUpdateManyWithoutUsersInput
}

export interface UserUncheckedUpdateWithoutInvitesInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUncheckedUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedUpdateManyWithoutMembersInput
  canEdit?: ClubUncheckedUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput
  roles?: RoleUncheckedUpdateManyWithoutUsersInput
}

export interface UserCreateWithoutRolesInput {
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubCreateNestedManyWithoutMembersInput
  canEdit?: ClubCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoCreateNestedManyWithoutTeacherInput
  invites?: InviteCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateWithoutRolesInput {
  id?: number
  ccid: string
  firstname: string
  lastname: string
  email: string
  emailVerified: boolean
  password: string
  grade: string
  type?: string
  interests?: TagUncheckedCreateNestedManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedCreateNestedManyWithoutMembersInput
  canEdit?: ClubUncheckedCreateNestedManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedCreateNestedManyWithoutTeacherInput
  invites?: InviteUncheckedCreateNestedManyWithoutUserInput
}

export interface UserCreateOrConnectWithoutRolesInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutRolesInput
}

export interface ClubCreateWithoutRolesInput {
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoCreateNestedOneWithoutClubInput
  tags?: TagCreateNestedManyWithoutClubsInput
  members?: UserCreateNestedManyWithoutClubsInput
  editors?: UserCreateNestedManyWithoutCanEditInput
  invites?: InviteCreateNestedManyWithoutClubInput
}

export interface ClubUncheckedCreateWithoutRolesInput {
  id?: number
  name?: string | null
  slug?: string | null
  description?: string | null
  email?: string | null
  meetingDate?: string | null
  location?: string | null
  approval?: string | null
  status?: string | null
  availability?: string | null
  links?: LinkUncheckedCreateNestedManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedCreateNestedOneWithoutClubInput
  tags?: TagUncheckedCreateNestedManyWithoutClubsInput
  members?: UserUncheckedCreateNestedManyWithoutClubsInput
  editors?: UserUncheckedCreateNestedManyWithoutCanEditInput
  invites?: InviteUncheckedCreateNestedManyWithoutClubInput
}

export interface ClubCreateOrConnectWithoutRolesInput {
  where: ClubWhereUniqueInput
  create: ClubUncheckedCreateWithoutRolesInput
}

export interface UserUpsertWithWhereUniqueWithoutRolesInput {
  where: UserWhereUniqueInput
  update: UserUncheckedUpdateWithoutRolesInput
  create: UserUncheckedCreateWithoutRolesInput
}

export interface UserUpdateWithWhereUniqueWithoutRolesInput {
  where: UserWhereUniqueInput
  data: UserUncheckedUpdateWithoutRolesInput
}

export interface UserUpdateManyWithWhereWithoutRolesInput {
  where: UserScalarWhereInput
  data: UserUncheckedUpdateManyWithoutUsersInput
}

export interface ClubUpsertWithoutRolesInput {
  update: ClubUncheckedUpdateWithoutRolesInput
  create: ClubUncheckedCreateWithoutRolesInput
}

export interface ClubUpdateWithoutRolesInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  members?: UserUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutRolesInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface ClubApplicationInfoCreateWithoutProjectedRevenueInput {
  teacher: UserCreateNestedOneWithoutAdvisorInput
  club: ClubCreateNestedOneWithoutApplicationInfoInput
  projectedExpenses?: ProjectedExpensesCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoUncheckedCreateWithoutProjectedRevenueInput {
  id?: number
  userId: number
  clubId: number
  projectedExpenses?: ProjectedExpensesUncheckedCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoCreateOrConnectWithoutProjectedRevenueInput {
  where: ClubApplicationInfoWhereUniqueInput
  create: ClubApplicationInfoUncheckedCreateWithoutProjectedRevenueInput
}

export interface ClubApplicationInfoUpsertWithoutProjectedRevenueInput {
  update: ClubApplicationInfoUncheckedUpdateWithoutProjectedRevenueInput
  create: ClubApplicationInfoUncheckedCreateWithoutProjectedRevenueInput
}

export interface ClubApplicationInfoUpdateWithoutProjectedRevenueInput {
  teacher?: UserUpdateOneRequiredWithoutAdvisorInput
  club?: ClubUpdateOneRequiredWithoutApplicationInfoInput
  projectedExpenses?: ProjectedExpensesUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateWithoutProjectedRevenueInput {
  id?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  projectedExpenses?: ProjectedExpensesUncheckedUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoCreateWithoutProjectedExpensesInput {
  teacher: UserCreateNestedOneWithoutAdvisorInput
  club: ClubCreateNestedOneWithoutApplicationInfoInput
  projectedRevenue?: ProjectedRevenueCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoUncheckedCreateWithoutProjectedExpensesInput {
  id?: number
  userId: number
  clubId: number
  projectedRevenue?: ProjectedRevenueUncheckedCreateNestedManyWithoutClubInput
  purpose: string
  membershipRequirements: string
  dutiesOfMembers: string
  titlesAndDutiesOfOfficers: string
  selectionOfOfficers: string
  officerMinimumGPA: number
  percentAttendanceForOfficialMeeting: number
  percentAttendanceToApproveDecision: number
}

export interface ClubApplicationInfoCreateOrConnectWithoutProjectedExpensesInput {
  where: ClubApplicationInfoWhereUniqueInput
  create: ClubApplicationInfoUncheckedCreateWithoutProjectedExpensesInput
}

export interface ClubApplicationInfoUpsertWithoutProjectedExpensesInput {
  update: ClubApplicationInfoUncheckedUpdateWithoutProjectedExpensesInput
  create: ClubApplicationInfoUncheckedCreateWithoutProjectedExpensesInput
}

export interface ClubApplicationInfoUpdateWithoutProjectedExpensesInput {
  teacher?: UserUpdateOneRequiredWithoutAdvisorInput
  club?: ClubUpdateOneRequiredWithoutApplicationInfoInput
  projectedRevenue?: ProjectedRevenueUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateWithoutProjectedExpensesInput {
  id?: IntFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  projectedRevenue?: ProjectedRevenueUncheckedUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface LinkUpdateWithoutClubInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface LinkUncheckedUpdateWithoutClubInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface LinkUncheckedUpdateManyWithoutLinksInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  link?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface TagUpdateWithoutClubsInput {
  name?: StringFieldUpdateOperationsInput
  interestedUsers?: UserUpdateManyWithoutInterestsInput
}

export interface TagUncheckedUpdateWithoutClubsInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  interestedUsers?: UserUncheckedUpdateManyWithoutInterestsInput
}

export interface TagUncheckedUpdateManyWithoutTagsInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
}

export interface UserUpdateWithoutClubsInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUpdateManyWithoutInterestedUsersInput
  canEdit?: ClubUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUpdateManyWithoutTeacherInput
  roles?: RoleUpdateManyWithoutUsersInput
  invites?: InviteUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateWithoutClubsInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUncheckedUpdateManyWithoutInterestedUsersInput
  canEdit?: ClubUncheckedUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput
  roles?: RoleUncheckedUpdateManyWithoutUsersInput
  invites?: InviteUncheckedUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateManyWithoutMembersInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface UserUpdateWithoutCanEditInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUpdateManyWithoutMembersInput
  advisor?: ClubApplicationInfoUpdateManyWithoutTeacherInput
  roles?: RoleUpdateManyWithoutUsersInput
  invites?: InviteUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateWithoutCanEditInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUncheckedUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedUpdateManyWithoutMembersInput
  advisor?: ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput
  roles?: RoleUncheckedUpdateManyWithoutUsersInput
  invites?: InviteUncheckedUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateManyWithoutEditorsInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUpdateWithoutClubInput {
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  users?: UserUpdateManyWithoutRolesInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUncheckedUpdateWithoutClubInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  users?: UserUncheckedUpdateManyWithoutRolesInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUncheckedUpdateManyWithoutRolesInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface InviteUpdateWithoutClubInput {
  status?: StringFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutInvitesInput
}

export interface InviteUncheckedUpdateWithoutClubInput {
  id?: IntFieldUpdateOperationsInput
  status?: StringFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
}

export interface InviteUncheckedUpdateManyWithoutInvitesInput {
  id?: IntFieldUpdateOperationsInput
  status?: StringFieldUpdateOperationsInput
  userId?: IntFieldUpdateOperationsInput
}

export interface ProjectedRevenueUpdateWithoutClubInput {
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedRevenueUncheckedUpdateWithoutClubInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedRevenueUncheckedUpdateManyWithoutProjectedRevenueInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesUpdateWithoutClubInput {
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesUncheckedUpdateWithoutClubInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ProjectedExpensesUncheckedUpdateManyWithoutProjectedExpensesInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  amount?: FloatFieldUpdateOperationsInput
  date?: StringFieldUpdateOperationsInput
}

export interface ClubUpdateWithoutTagsInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  members?: UserUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  roles?: RoleUpdateManyWithoutClubInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutTagsInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateManyWithoutClubsInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
}

export interface UserUpdateWithoutInterestsInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  clubs?: ClubUpdateManyWithoutMembersInput
  canEdit?: ClubUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUpdateManyWithoutTeacherInput
  roles?: RoleUpdateManyWithoutUsersInput
  invites?: InviteUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateWithoutInterestsInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  clubs?: ClubUncheckedUpdateManyWithoutMembersInput
  canEdit?: ClubUncheckedUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput
  roles?: RoleUncheckedUpdateManyWithoutUsersInput
  invites?: InviteUncheckedUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateManyWithoutInterestedUsersInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface TagUpdateWithoutInterestedUsersInput {
  name?: StringFieldUpdateOperationsInput
  clubs?: ClubUpdateManyWithoutTagsInput
}

export interface TagUncheckedUpdateWithoutInterestedUsersInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  clubs?: ClubUncheckedUpdateManyWithoutTagsInput
}

export interface TagUncheckedUpdateManyWithoutInterestsInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
}

export interface ClubUpdateWithoutMembersInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  editors?: UserUpdateManyWithoutCanEditInput
  roles?: RoleUpdateManyWithoutClubInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutMembersInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  editors?: UserUncheckedUpdateManyWithoutCanEditInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface ClubUpdateWithoutEditorsInput {
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUpdateOneWithoutClubInput
  tags?: TagUpdateManyWithoutClubsInput
  members?: UserUpdateManyWithoutClubsInput
  roles?: RoleUpdateManyWithoutClubInput
  invites?: InviteUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateWithoutEditorsInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
  links?: LinkUncheckedUpdateManyWithoutClubInput
  applicationInfo?: ClubApplicationInfoUncheckedUpdateOneWithoutClubInput
  tags?: TagUncheckedUpdateManyWithoutClubsInput
  members?: UserUncheckedUpdateManyWithoutClubsInput
  roles?: RoleUncheckedUpdateManyWithoutClubInput
  invites?: InviteUncheckedUpdateManyWithoutClubInput
}

export interface ClubUncheckedUpdateManyWithoutCanEditInput {
  id?: IntFieldUpdateOperationsInput
  name?: NullableStringFieldUpdateOperationsInput | null
  slug?: NullableStringFieldUpdateOperationsInput | null
  description?: NullableStringFieldUpdateOperationsInput | null
  email?: NullableStringFieldUpdateOperationsInput | null
  meetingDate?: NullableStringFieldUpdateOperationsInput | null
  location?: NullableStringFieldUpdateOperationsInput | null
  approval?: NullableStringFieldUpdateOperationsInput | null
  status?: NullableStringFieldUpdateOperationsInput | null
  availability?: NullableStringFieldUpdateOperationsInput | null
}

export interface ClubApplicationInfoUpdateWithoutTeacherInput {
  club?: ClubUpdateOneRequiredWithoutApplicationInfoInput
  projectedRevenue?: ProjectedRevenueUpdateManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateWithoutTeacherInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  projectedRevenue?: ProjectedRevenueUncheckedUpdateManyWithoutClubInput
  projectedExpenses?: ProjectedExpensesUncheckedUpdateManyWithoutClubInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface ClubApplicationInfoUncheckedUpdateManyWithoutAdvisorInput {
  id?: IntFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  purpose?: StringFieldUpdateOperationsInput
  membershipRequirements?: StringFieldUpdateOperationsInput
  dutiesOfMembers?: StringFieldUpdateOperationsInput
  titlesAndDutiesOfOfficers?: StringFieldUpdateOperationsInput
  selectionOfOfficers?: StringFieldUpdateOperationsInput
  officerMinimumGPA?: FloatFieldUpdateOperationsInput
  percentAttendanceForOfficialMeeting?: IntFieldUpdateOperationsInput
  percentAttendanceToApproveDecision?: IntFieldUpdateOperationsInput
}

export interface RoleUpdateWithoutUsersInput {
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  club?: ClubUpdateOneRequiredWithoutRolesInput
  type?: StringFieldUpdateOperationsInput
}

export interface RoleUncheckedUpdateWithoutUsersInput {
  id?: IntFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  color?: StringFieldUpdateOperationsInput
  description?: StringFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export interface InviteUpdateWithoutUserInput {
  status?: StringFieldUpdateOperationsInput
  club?: ClubUpdateOneRequiredWithoutInvitesInput
}

export interface InviteUncheckedUpdateWithoutUserInput {
  id?: IntFieldUpdateOperationsInput
  status?: StringFieldUpdateOperationsInput
  clubId?: IntFieldUpdateOperationsInput
}

export interface UserUpdateWithoutRolesInput {
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUpdateManyWithoutMembersInput
  canEdit?: ClubUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUpdateManyWithoutTeacherInput
  invites?: InviteUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateWithoutRolesInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
  interests?: TagUncheckedUpdateManyWithoutInterestedUsersInput
  clubs?: ClubUncheckedUpdateManyWithoutMembersInput
  canEdit?: ClubUncheckedUpdateManyWithoutEditorsInput
  advisor?: ClubApplicationInfoUncheckedUpdateManyWithoutTeacherInput
  invites?: InviteUncheckedUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateManyWithoutUsersInput {
  id?: IntFieldUpdateOperationsInput
  ccid?: StringFieldUpdateOperationsInput
  firstname?: StringFieldUpdateOperationsInput
  lastname?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  emailVerified?: BoolFieldUpdateOperationsInput
  password?: StringFieldUpdateOperationsInput
  grade?: StringFieldUpdateOperationsInput
  type?: StringFieldUpdateOperationsInput
}

export enum ClubScalarFieldEnum {
  id = 'id',
  name = 'name',
  slug = 'slug',
  description = 'description',
  email = 'email',
  meetingDate = 'meetingDate',
  location = 'location',
  approval = 'approval',
  status = 'status',
  availability = 'availability',
}
export enum LinkScalarFieldEnum {
  id = 'id',
  clubId = 'clubId',
  name = 'name',
  link = 'link',
  type = 'type',
}
export enum ClubApplicationInfoScalarFieldEnum {
  id = 'id',
  userId = 'userId',
  clubId = 'clubId',
  purpose = 'purpose',
  membershipRequirements = 'membershipRequirements',
  dutiesOfMembers = 'dutiesOfMembers',
  titlesAndDutiesOfOfficers = 'titlesAndDutiesOfOfficers',
  selectionOfOfficers = 'selectionOfOfficers',
  officerMinimumGPA = 'officerMinimumGPA',
  percentAttendanceForOfficialMeeting = 'percentAttendanceForOfficialMeeting',
  percentAttendanceToApproveDecision = 'percentAttendanceToApproveDecision',
}
export enum TagScalarFieldEnum {
  id = 'id',
  name = 'name',
}
export enum UserScalarFieldEnum {
  id = 'id',
  ccid = 'ccid',
  firstname = 'firstname',
  lastname = 'lastname',
  email = 'email',
  emailVerified = 'emailVerified',
  password = 'password',
  grade = 'grade',
  type = 'type',
}
export enum InviteScalarFieldEnum {
  id = 'id',
  status = 'status',
  clubId = 'clubId',
  userId = 'userId',
}
export enum RoleScalarFieldEnum {
  id = 'id',
  name = 'name',
  color = 'color',
  description = 'description',
  clubId = 'clubId',
  type = 'type',
}
export enum ProjectedRevenueScalarFieldEnum {
  id = 'id',
  clubId = 'clubId',
  name = 'name',
  amount = 'amount',
  date = 'date',
}
export enum ProjectedExpensesScalarFieldEnum {
  id = 'id',
  clubId = 'clubId',
  name = 'name',
  amount = 'amount',
  date = 'date',
}
export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

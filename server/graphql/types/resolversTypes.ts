import * as Client from "@prisma/client";
import { Context } from "../ctx";
import {
  Club,
  Link,
  ClubApplicationInfo,
  Tag,
  User,
  Invite,
  Role,
  ProjectedRevenue,
  ProjectedExpenses,
} from "./schemaTypes";
import type {
  FindUserBySessionArgs,
  FindUserBySessionPayload,
  LoginArgs,
  LoginPayload,
  RegisterArgs,
  RegisterPayload,
  ChangePasswordArgs,
  ChangePasswordPayload,
  CheckEmailArgs,
  CheckEmailPayload,
  CheckStudentIdArgs,
  CheckStudentIdPayload,
  SendVerificationEmailArgs,
  SendVerificationEmailPayload,
} from "../auth/types";
import type {
  UpdateUserInterestsArgs,
  UpdateUserInterestsPayload,
  GetUserClubsArgs,
  GetUserClubsPayload,
  GetUserLeadershipClubsArgs,
  GetUserLeadershipClubsPayload,
  DeleteUserArgs,
  DeleteUserPayload,
  ValidateStudentArgs,
  ValidateStudentPayload,
  ApproveUserArgs,
  ApproveUserPayload,
  GetUsersArgs,
  GetUsersPayload,
  BatchDeleteUsersArgs,
  BatchDeleteUsersPayload,
  BatchApproveUsersArgs,
  BatchApproveUsersPayload,
  GetUserArgs,
  GetUserPayload,
  ValidateTeacherArgs,
  ValidateTeacherPayload,
  GetUserDraftsArgs,
  GetUserDraftsPayload,
} from "../user/types";
import type {
  CreateClubArgs,
  CreateClubPayload,
  EditClubArgs,
  EditClubPayload,
  DeleteClubArgs,
  DeleteClubPayload,
  JoinClubArgs,
  JoinClubPayload,
  LeaveClubArgs,
  LeaveClubPayload,
  GetClubArgs,
  GetClubPayload,
  SendClubForApprovalArgs,
  SendClubForApprovalPayload,
  ApproveClubArgs,
  ApproveClubPayload,
  GetApprovedClubsArgs,
  GetApprovedClubsPayload,
  GetUnapprovedClubsArgs,
  GetUnapprovedClubsPayload,
  GetAdminApprovedClubsArgs,
  GetAdminApprovedClubsPayload,
  RequestToJoinClubArgs,
  RequestToJoinClubPayload,
  GetClubInvitesArgs,
  GetClubInvitesPayload,
} from "../club/types";
import type {
  GetUserInvitesArgs,
  GetUserInvitesPayload,
  AcceptInviteArgs,
  AcceptInvitePayload,
  DeclineInviteArgs,
  DeclineInvitePayload,
  IssueInviteArgs,
  IssueInvitePayload,
  DeleteIncomingInviteArgs,
  DeleteIncomingInvitePayload,
  DeleteOutgoingInviteArgs,
  DeleteOutgoingInvitePayload,
} from "../invite/types";
import type {
  GetTagArgs,
  GetTagsPayload,
  CreateTagsArgs,
  CreateTagsPayload,
} from "../tag/types";

import { GraphQLResolveInfo } from "graphql";
import { AddLinkArgs, AddLinkPayload } from "../link/types";
import {
  IssueTeacherInviteArgs,
  IssueTeacherInvitePayload,
} from "../invite/resolvers/issueTeacherInvite";
import {
  AcceptTeacherInviteArgs,
  AcceptTeacherInvitePayload,
} from "../invite/resolvers/acceptTeacherInvite";

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<R>;

export interface Resolvers {
  [key: string]: { [key: string]: Resolver<any, any, any> };
  Query?: Query;
  Mutation?: Mutation;
  Auth?: AuthResolvers;
  Club?: ClubResolvers;
  Invite?: InviteResolvers;
}

export interface AuthResolvers {
  [key: string]: Resolver<any, any, any>;
  register?: Resolver<{}, RegisterArgs, RegisterPayload>;
  login?: Resolver<{}, LoginArgs, LoginPayload>;
  checkEmail?: Resolver<{}, CheckEmailArgs, CheckEmailPayload>;

  SendVerificationEmail?: Resolver<
    {},
    SendVerificationEmailArgs,
    SendVerificationEmailPayload
  >;
  checkStudentId?: Resolver<{}, CheckStudentIdArgs, CheckStudentIdPayload>;
  changePassword?: Resolver<{}, ChangePasswordArgs, ChangePasswordPayload>;
  findUserBySession?: Resolver<
    {},
    FindUserBySessionArgs,
    FindUserBySessionPayload
  >;
}

export interface UserResolvers {
  [key: string]: Resolver<any, any, any>;
  deleteUser?: Resolver<{}, DeleteUserArgs, DeleteUserPayload>;
  updateUserInterests?: Resolver<
    {},
    UpdateUserInterestsArgs,
    UpdateUserInterestsPayload
  >;
  getUserClubs?: Resolver<{}, GetUserClubsArgs, GetUserClubsPayload>;
  getUserLeadershipClubs?: Resolver<
    {},
    GetUserLeadershipClubsArgs,
    GetUserLeadershipClubsPayload
  >;
  validateStudent?: Resolver<{}, ValidateStudentArgs, ValidateStudentPayload>;
  validateTeacher?: Resolver<{}, ValidateTeacherArgs, ValidateTeacherPayload>;
  approveUser?: Resolver<{}, ApproveUserArgs, ApproveUserPayload>;
  getUsers?: Resolver<{}, GetUsersArgs, GetUsersPayload>;
  batchDeleteUsers?: Resolver<
    {},
    BatchDeleteUsersArgs,
    BatchDeleteUsersPayload
  >;
  batchApproveUsers?: Resolver<
    {},
    BatchApproveUsersArgs,
    BatchApproveUsersPayload
  >;
  getUser?: Resolver<{}, GetUserArgs, GetUserPayload>;
  getUserDrafts?: Resolver<{}, GetUserDraftsArgs, GetUserDraftsPayload>;
}

export interface ClubResolvers {
  [key: string]: Resolver<any, any, any>;
  createClub?: Resolver<{}, CreateClubArgs, CreateClubPayload>;
  editClub?: Resolver<{}, EditClubArgs, EditClubPayload>;
  deleteClub?: Resolver<{}, DeleteClubArgs, DeleteClubPayload>;
  joinClub?: Resolver<{}, JoinClubArgs, JoinClubPayload>;
  leaveClub?: Resolver<{}, LeaveClubArgs, LeaveClubPayload>;
  getClub?: Resolver<{}, GetClubArgs, GetClubPayload>;
  sendClubForApproval?: Resolver<
    {},
    SendClubForApprovalArgs,
    SendClubForApprovalPayload
  >;
  approveClub?: Resolver<{}, ApproveClubArgs, ApproveClubPayload>;
  getApprovedClubs?: Resolver<
    {},
    GetApprovedClubsArgs,
    GetApprovedClubsPayload
  >;
  getUnapprovedClubs?: Resolver<
    {},
    GetUnapprovedClubsArgs,
    GetUnapprovedClubsPayload
  >;
  getAdminApprovedClubs?: Resolver<
    {},
    GetAdminApprovedClubsArgs,
    GetAdminApprovedClubsPayload
  >;
  requestToJoinClub?: Resolver<
    {},
    RequestToJoinClubArgs,
    RequestToJoinClubPayload
  >;
  getClubInvites?: Resolver<{}, GetClubInvitesArgs, GetClubInvitesPayload>;
}

export interface InviteResolvers {
  [key: string]: Resolver<any, any, any>;
  getUserInvites?: Resolver<{}, GetUserInvitesArgs, GetUserInvitesPayload>;
  issueInvite?: Resolver<{}, IssueInviteArgs, IssueInvitePayload>;
  acceptInvite?: Resolver<{}, AcceptInviteArgs, AcceptInvitePayload>;
  declineInvite?: Resolver<{}, DeclineInviteArgs, DeclineInvitePayload>;
  issueTeacherInvite?: Resolver<
    {},
    IssueTeacherInviteArgs,
    IssueTeacherInvitePayload
  >;
  acceptTeacherInvite?: Resolver<
    {},
    AcceptTeacherInviteArgs,
    AcceptTeacherInvitePayload
  >;
  deleteIncomingInvite?: Resolver<
    {},
    DeleteIncomingInviteArgs,
    DeleteIncomingInvitePayload
  >;
  deleteOutgoingInvite?: Resolver<
    {},
    DeleteOutgoingInviteArgs,
    DeleteOutgoingInvitePayload
  >;
}

export interface TagResolvers {
  [key: string]: Resolver<any, any, any>;
  getTags?: Resolver<{}, GetTagArgs, GetTagsPayload>;
  createTags?: Resolver<{}, CreateTagsArgs, CreateTagsPayload>;
}

export interface LinkResolvers {
  [key: string]: Resolver<any, any, any>;
  addLink?: Resolver<{}, AddLinkArgs, AddLinkPayload>;
}

export interface Query {
  [key: string]: Resolver<any, any, any>;
  // auth
  checkEmail?: AuthResolvers["checkEmail"];
  sendVerificationEmail?: AuthResolvers["sendVerificationEmail"];
  checkStudentId?: AuthResolvers["checkStudentId"];
  findUserBySession?: AuthResolvers["findUserBySession"];
  //user
  getUserClubs?: UserResolvers["getUserClubs"];
  getUserLeadershipClubs?: UserResolvers["getUserLeadershipClubs"];
  validateStudent?: UserResolvers["ValidateStudent"];
  // club
  getClub?: ClubResolvers["getClub"];
  getClubs?: ClubResolvers["getClubs"];
  getApprovedClubs?: ClubResolvers["getApprovedClubs"];
  getUnapprovedClubs?: ClubResolvers["getUnapprovedClubs"];
  getAdminApprovedClubs?: ClubResolvers["getAdminApprovedClubs"];
  //invite
  getUserInvites?: InviteResolvers["getUserInvites"];
  // tag
  getTags?: TagResolvers["getTags"];
}

export interface Mutation {
  [key: string]: Resolver<any, any, any>;
  // auth
  register?: AuthResolvers["register"];
  login?: AuthResolvers["login"];
  changePassword?: AuthResolvers["changePassword"];
  // user
  deleteUser?: UserResolvers["deleteUser"];
  updateUserInterests?: UserResolvers["updateUserInterests"];
  // club
  createClub?: ClubResolvers["createClub"];
  editClub?: ClubResolvers["editClub"];
  deleteClub?: ClubResolvers["deleteClub"];
  joinClub?: ClubResolvers["joinClub"];
  leaveClub?: ClubResolvers["leaveClub"];
  //invite
  issueInvite?: InviteResolvers["issueInvite"];
  acceptInvite?: InviteResolvers["acceptInvite"];
  declineInvite?: InviteResolvers["declineInvite"];
}

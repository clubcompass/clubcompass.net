import { gql } from "@apollo/client";
import { UserFields } from "../user/userDocuments";
import { ClubFields } from "../club/clubDocuments";

export const ClubApplicationInfoFields = gql`
  fragment ClubApplicationInfoFields on ClubApplicationInfo {
    id
    userId
    clubId
    purpose
    membershipRequirements
    dutiesOfMembers
    titlesAndDutiesOfOfficers
    selectionOfOfficers
    officerMinimumGPA
    percentAttendanceForOfficialMeeting
    percentAttendanceToApproveDecision
  }
`;

export const ClubApplicationInfo = gql`fragment ClubApplicationInfo on ClubApplicationInfo {
  ...ClubApplicationInfoFields
  teacher {
    ...UserFields
  }
  club {
    ...ClubFields
  }
  ${UserFields}
  ${ClubFields}
}`;

export const findUniqueClubApplicationInfo = gql`query findUniqueClubApplicationInfo($where: ClubApplicationInfoWhereUniqueInput!) {
  findUniqueClubApplicationInfo(where: $where) {
    ...ClubApplicationInfo
  }
  ${ClubApplicationInfo}
}`;

export const findManyClubApplicationInfo = gql`query findManyClubApplicationInfo(
  $where: ClubApplicationInfoWhereInput
  $orderBy: [ClubApplicationInfoOrderByWithRelationInput!]
  $cursor: ClubApplicationInfoWhereUniqueInput
  $skip: Int
  $take: Int
) {
  findManyClubApplicationInfo(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...ClubApplicationInfo
  }
  ${ClubApplicationInfo}
}`;

export const findManyClubApplicationInfoCount = gql`
  query findManyClubApplicationInfoCount(
    $where: ClubApplicationInfoWhereInput
    $orderBy: [ClubApplicationInfoOrderByWithRelationInput!]
    $cursor: ClubApplicationInfoWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyClubApplicationInfoCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneClubApplicationInfo = gql`
  mutation createOneClubApplicationInfo(
    $data: ClubApplicationInfoCreateInput!
  ) {
    createOneClubApplicationInfo(data: $data) {
      ...ClubApplicationInfo
    }
  }
  ${ClubApplicationInfo}
`;

export const updateOneClubApplicationInfo = gql`
  mutation updateOneClubApplicationInfo(
    $where: ClubApplicationInfoWhereUniqueInput!
    $data: ClubApplicationInfoUpdateInput!
  ) {
    updateOneClubApplicationInfo(where: $where, data: $data) {
      ...ClubApplicationInfo
    }
  }
  ${ClubApplicationInfo}
`;

export const DeleteOneClubApplicationInfo = gql`
  mutation deleteOneClubApplicationInfo(
    $where: ClubApplicationInfoWhereUniqueInput!
  ) {
    deleteOneClubApplicationInfo(where: $where) {
      ...ClubApplicationInfo
    }
  }
  ${ClubApplicationInfo}
`;

export const deleteManyClubApplicationInfo = gql`
  mutation deleteManyClubApplicationInfo(
    $where: ClubApplicationInfoWhereInput
  ) {
    deleteManyClubApplicationInfo(where: $where) {
      count
    }
  }
`;

export const updateManyClubApplicationInfo = gql`
  mutation updateManyClubApplicationInfo(
    $where: ClubApplicationInfoWhereInput
    $data: ClubApplicationInfoUpdateManyMutationInput!
  ) {
    updateManyClubApplicationInfo(where: $where, data: $data) {
      count
    }
  }
`;

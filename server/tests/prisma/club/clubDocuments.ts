import { gql } from "@apollo/client";
import { Club } from "../fragments";

export const findUniqueClub = gql`
  query findUniqueClub($where: ClubWhereUniqueInput!) {
    findUniqueClub(where: $where) {
      ...Club
    }
  }
  ${Club}
`;

export const findManyClub = gql`
  query findManyClub(
    $where: ClubWhereInput
    $orderBy: [ClubOrderByWithRelationInput!]
    $cursor: ClubWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyClub(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...Club
    }
  }
  ${Club}
`;

export const findManyClubCount = gql`
  query findManyClubCount(
    $where: ClubWhereInput
    $orderBy: [ClubOrderByWithRelationInput!]
    $cursor: ClubWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyClubCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneClub = gql`
  mutation createOneClub($data: ClubCreateInput!) {
    createOneClub(data: $data) {
      ...Club
    }
  }
  ${Club}
`;

export const updateOneClub = gql`
  mutation updateOneClub(
    $where: ClubWhereUniqueInput!
    $data: ClubUpdateInput!
  ) {
    updateOneClub(where: $where, data: $data) {
      ...Club
    }
  }
  ${Club}
`;

export const deleteOneClub = gql`
  mutation deleteOneClub($where: ClubWhereUniqueInput!) {
    deleteOneClub(where: $where) {
      ...Club
    }
  }
  ${Club}
`;
export const deleteManyClubs = gql`
  mutation deleteManyClub($where: ClubWhereInput) {
    deleteManyClub(where: $where) {
      count
    }
  }
`;

export const updateManyClubs = gql`
  mutation updateManyClub(
    $where: ClubWhereInput
    $data: ClubUpdateManyMutationInput!
  ) {
    updateManyClub(where: $where, data: $data) {
      count
    }
  }
`;

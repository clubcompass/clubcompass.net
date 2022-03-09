import { gql } from "@apollo/client";
import { ProjectedRevenue } from "../fragments";

export const findUniqueProjectedRevenue = gql`
  query findUniqueProjectedRevenue($where: ProjectedRevenueWhereUniqueInput!) {
    findUniqueProjectedRevenue(where: $where) {
      ...ProjectedRevenue
    }
  }
  ${ProjectedRevenue}
`;

export const findManyProjectedRevenue = gql`
  query findManyProjectedRevenue(
    $where: ProjectedRevenueWhereInput
    $orderBy: [ProjectedRevenueOrderByWithRelationInput!]
    $cursor: ProjectedRevenueWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyProjectedRevenue(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...ProjectedRevenue
    }
  }
  ${ProjectedRevenue}
`;

export const findManyProjectedRevenueCount = gql`
  query findManyProjectedRevenueCount(
    $where: ProjectedRevenueWhereInput
    $orderBy: [ProjectedRevenueOrderByWithRelationInput!]
    $cursor: ProjectedRevenueWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyProjectedRevenueCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneProjectedRevenue = gql`
  mutation createOneProjectedRevenue($data: ProjectedRevenueCreateInput!) {
    createOneProjectedRevenue(data: $data) {
      ...ProjectedRevenue
    }
  }
  ${ProjectedRevenue}
`;

export const updateOneProjectedRevenue = gql`
  mutation updateOneProjectedRevenue(
    $where: ProjectedRevenueWhereUniqueInput!
    $data: ProjectedRevenueUpdateInput!
  ) {
    updateOneProjectedRevenue(where: $where, data: $data) {
      ...ProjectedRevenue
    }
  }
  ${ProjectedRevenue}
`;

export const deleteOneProjectedRevenue = gql`
  mutation deleteOneProjectedRevenue(
    $where: ProjectedRevenueWhereUniqueInput!
  ) {
    deleteOneProjectedRevenue(where: $where) {
      ...ProjectedRevenue
    }
  }
  ${ProjectedRevenue}
`;

export const deleteManyProjectedRevenue = gql`
  mutation deleteManyProjectedRevenue($where: ProjectedRevenueWhereInput) {
    deleteManyProjectedRevenue(where: $where) {
      count
    }
  }
`;

export const updateManyProjectedRevenue = gql`
  mutation updateManyProjectedRevenue(
    $where: ProjectedRevenueWhereInput
    $data: ProjectedRevenueUpdateManyMutationInput!
  ) {
    updateManyProjectedRevenue(where: $where, data: $data) {
      count
    }
  }
`;

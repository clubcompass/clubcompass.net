import { gql } from "@apollo/client";
import { ProjectedExpenses } from "../fragments";

export const findUniqueProjectedExpenses = gql`
  query findUniqueProjectedExpenses(
    $where: ProjectedExpensesWhereUniqueInput!
  ) {
    findUniqueProjectedExpenses(where: $where) {
      ...ProjectedExpenses
    }
  }
  ${ProjectedExpenses}
`;

export const findManyProjectedExpenses = gql`
  query findManyProjectedExpenses(
    $where: ProjectedExpensesWhereInput
    $orderBy: [ProjectedExpensesOrderByWithRelationInput!]
    $cursor: ProjectedExpensesWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyProjectedExpenses(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...ProjectedExpenses
    }
  }
  ${ProjectedExpenses}
`;

export const findManyProjectedExpensesCount = gql`
  query findManyProjectedExpensesCount(
    $where: ProjectedExpensesWhereInput
    $orderBy: [ProjectedExpensesOrderByWithRelationInput!]
    $cursor: ProjectedExpensesWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyProjectedExpensesCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneProjectedExpenses = gql`
  mutation createOneProjectedExpenses($data: ProjectedExpensesCreateInput!) {
    createOneProjectedExpenses(data: $data) {
      ...ProjectedExpenses
    }
  }
  ${ProjectedExpenses}
`;

export const updateOneProjectedExpenses = gql`
  mutation updateOneProjectedExpenses(
    $where: ProjectedExpensesWhereUniqueInput!
    $data: ProjectedExpensesUpdateInput!
  ) {
    updateOneProjectedExpenses(where: $where, data: $data) {
      ...ProjectedExpenses
    }
  }
  ${ProjectedExpenses}
`;

export const deleteOneProjectedExpenses = gql`
  mutation deleteOneProjectedExpenses(
    $where: ProjectedExpensesWhereUniqueInput!
  ) {
    deleteOneProjectedExpenses(where: $where) {
      ...ProjectedExpenses
    }
  }
  ${ProjectedExpenses}
`;

export const deleteManyProjectedExpenses = gql`
  mutation deleteManyProjectedExpenses($where: ProjectedExpensesWhereInput) {
    deleteManyProjectedExpenses(where: $where) {
      count
    }
  }
`;

export const updateManyProjectedExpenses = gql`
  mutation updateManyProjectedExpenses(
    $where: ProjectedExpensesWhereInput
    $data: ProjectedExpensesUpdateManyMutationInput!
  ) {
    updateManyProjectedExpenses(where: $where, data: $data) {
      count
    }
  }
`;

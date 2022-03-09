import { gql } from "@apollo/client";
import { Role } from "../fragments";
export const findUniqueRole = gql`
  query findUniqueRole($where: RoleWhereUniqueInput!) {
    findUniqueRole(where: $where) {
      ...Role
    }
  }
  ${Role}
`;

export const findManyRole = gql`
  query findManyRole(
    $where: RoleWhereInput
    $orderBy: [RoleOrderByWithRelationInput!]
    $cursor: RoleWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyRole(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...Role
    }
  }
  ${Role}
`;

export const findManyRoleCount = gql`
  query findManyRoleCount(
    $where: RoleWhereInput
    $orderBy: [RoleOrderByWithRelationInput!]
    $cursor: RoleWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyRoleCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneRole = gql`
  mutation createOneRole($data: RoleCreateInput!) {
    createOneRole(data: $data) {
      ...Role
    }
  }
  ${Role}
`;

export const updateOneRole = gql`
  mutation updateOneRole(
    $where: RoleWhereUniqueInput!
    $data: RoleUpdateInput!
  ) {
    updateOneRole(where: $where, data: $data) {
      ...Role
    }
  }
  ${Role}
`;

export const deleteOneRole = gql`
  mutation deleteOneRole($where: RoleWhereUniqueInput!) {
    deleteOneRole(where: $where) {
      ...Role
    }
  }
  ${Role}
`;

export const deleteManyRole = gql`
  mutation deleteManyRole($where: RoleWhereInput) {
    deleteManyRole(where: $where) {
      count
    }
  }
`;

export const updateManyRole = gql`
  mutation updateManyRole(
    $where: RoleWhereInput
    $data: RoleUpdateManyMutationInput!
  ) {
    updateManyRole(where: $where, data: $data) {
      count
    }
  }
`;

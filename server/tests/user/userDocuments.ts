import { gql } from "@apollo/client";

export const UserFields = gql`
  fragment UserFields on User {
    id
    ccid
    firstname
    lastname
    email
    emailVerified
    password
    grade
    type
  }
`;

export const User = gql`
  fragment User on User {
    ...UserFields
  }
  ${UserFields}
`;

export const findUniqueUser = gql`
  query findUniqueUser($where: UserWhereUniqueInput!) {
    findUniqueUser(where: $where) {
      ...User
    }
  }
  ${User}
`;

export const findManyUser = gql`
  query findManyUser(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput!]
    $cursor: UserWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyUser(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...User
    }
  }
  ${User}
`;

export const findManyUserCount = gql`
  query findManyUserCount(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput!]
    $cursor: UserWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyUserCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneUser = gql`
  mutation createOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      ...User
    }
  }
  ${User}
`;

export const updateOneUser = gql`
  mutation updateOneUser(
    $where: UserWhereUniqueInput!
    $data: UserUpdateInput!
  ) {
    updateOneUser(where: $where, data: $data) {
      ...User
    }
  }
  ${User}
`;

export const deleteOneUser = gql`
  mutation deleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      ...User
    }
  }
  ${User}
`;

export const deleteManyUser = gql`
  mutation deleteManyUser($where: UserWhereInput) {
    deleteManyUser(where: $where) {
      count
    }
  }
`;

export const updateManyUser = gql`
  mutation updateManyUser(
    $where: UserWhereInput
    $data: UserUpdateManyMutationInput!
  ) {
    updateManyUser(where: $where, data: $data) {
      count
    }
  }
`;

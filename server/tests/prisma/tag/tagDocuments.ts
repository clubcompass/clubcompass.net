import { gql } from "@apollo/client";
import { Tag } from "../fragments";

export const findUniqueTag = gql`
  query findUniqueTag($where: TagWhereUniqueInput!) {
    findUniqueTag(where: $where) {
      ...Tag
    }
  }
  ${Tag}
`;

export const findManyTag = gql`
  query findManyTag(
    $where: TagWhereInput
    $orderBy: [TagOrderByWithRelationInput!]
    $cursor: TagWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyTag(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...Tag
    }
  }
  ${Tag}
`;

export const findManyTagCount = gql`
  query findManyTagCount(
    $where: TagWhereInput
    $orderBy: [TagOrderByWithRelationInput!]
    $cursor: TagWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyTagCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneTag = gql`
  mutation createOneTag($data: TagCreateInput!) {
    createOneTag(data: $data) {
      ...Tag
    }
  }
  ${Tag}
`;

export const updateOneTag = gql`
  mutation updateOneTag($where: TagWhereUniqueInput!, $data: TagUpdateInput!) {
    updateOneTag(where: $where, data: $data) {
      ...Tag
    }
  }
  ${Tag}
`;

export const deleteOneTag = gql`
  mutation deleteOneTag($where: TagWhereUniqueInput!) {
    deleteOneTag(where: $where) {
      ...Tag
    }
  }
  ${Tag}
`;

export const deleteManyTags = gql`
  mutation deleteManyTag($where: TagWhereInput) {
    deleteManyTag(where: $where) {
      count
    }
  }
`;

export const updateManyTags = gql`
  mutation updateManyTag(
    $where: TagWhereInput
    $data: TagUpdateManyMutationInput!
  ) {
    updateManyTag(where: $where, data: $data) {
      count
    }
  }
`;

import { gql } from "@apollo/client";
import { Link } from "../fragments";
export const findUniqueLink = gql`
  query findUniqueLink($where: LinkWhereUniqueInput!) {
    findUniqueLink(where: $where) {
      ...Link
    }
  }
  ${Link}
`;

export const findManyLink = gql`
  query findManyLink(
    $where: LinkWhereInput
    $orderBy: [LinkOrderByWithRelationInput!]
    $cursor: LinkWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyLink(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...Link
    }
  }
  ${Link}
`;

export const findManyLinkCount = gql`
  query findManyLinkCount(
    $where: LinkWhereInput
    $orderBy: [LinkOrderByWithRelationInput!]
    $cursor: LinkWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyLinkCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneLink = gql`
  mutation createOneLink($data: LinkCreateInput!) {
    createOneLink(data: $data) {
      ...Link
    }
  }
  ${Link}
`;

export const updateOneLink = gql`
  mutation updateOneLink(
    $where: LinkWhereUniqueInput!
    $data: LinkUpdateInput!
  ) {
    updateOneLink(where: $where, data: $data) {
      ...Link
    }
  }
  ${Link}
`;

export const deleteOneLink = gql`
  mutation deleteOneLink($where: LinkWhereUniqueInput!) {
    deleteOneLink(where: $where) {
      ...Link
    }
  }
  ${Link}
`;

export const deleteManyLink = gql`
  mutation deleteManyLink($where: LinkWhereInput) {
    deleteManyLink(where: $where) {
      count
    }
  }
`;

export const updateManyLink = gql`
  mutation updateManyLink(
    $where: LinkWhereInput
    $data: LinkUpdateManyMutationInput!
  ) {
    updateManyLink(where: $where, data: $data) {
      count
    }
  }
`;

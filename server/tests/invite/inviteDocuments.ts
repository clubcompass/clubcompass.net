import { gql } from "@apollo/client";
import { Invite } from "../fragments";
export const findUniqueInvite = gql`
  query findUniqueInvite($where: InviteWhereUniqueInput!) {
    findUniqueInvite(where: $where) {
      ...Invite
    }
  }
  ${Invite}
`;

export const findManyInvite = gql`
  query findManyInvite(
    $where: InviteWhereInput
    $orderBy: [InviteOrderByWithRelationInput!]
    $cursor: InviteWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyInvite(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    ) {
      ...Invite
    }
  }
  ${Invite}
`;

export const findManyInviteCount = gql`
  query findManyInviteCount(
    $where: InviteWhereInput
    $orderBy: [InviteOrderByWithRelationInput!]
    $cursor: InviteWhereUniqueInput
    $skip: Int
    $take: Int
  ) {
    findManyInviteCount(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      skip: $skip
      take: $take
    )
  }
`;

export const createOneInvite = gql`
  mutation createOneInvite($data: InviteCreateInput!) {
    createOneInvite(data: $data) {
      ...Invite
    }
  }
  ${Invite}
`;

export const updateOneInvite = gql`
  mutation updateOneInvite(
    $where: InviteWhereUniqueInput!
    $data: InviteUpdateInput!
  ) {
    updateOneInvite(where: $where, data: $data) {
      ...Invite
    }
  }
  ${Invite}
`;

export const deleteOneInvite = gql`
  mutation deleteOneInvite($where: InviteWhereUniqueInput!) {
    deleteOneInvite(where: $where) {
      ...Invite
    }
  }
  ${Invite}
`;

export const deleteManyInvite = gql`
  mutation deleteManyInvite($where: InviteWhereInput) {
    deleteManyInvite(where: $where) {
      count
    }
  }
`;

export const updateManyInvite = gql`
  mutation updateManyInvite(
    $where: InviteWhereInput
    $data: InviteUpdateManyMutationInput!
  ) {
    updateManyInvite(where: $where, data: $data) {
      count
    }
  }
`;

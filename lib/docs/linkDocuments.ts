import { gql } from "@apollo/client";

export const ADD_LINK = gql`
  mutation ($clubId: ID!, $data: AddLinkArgs!) {
    addLink(clubId: $clubId, data: $data) {
      id
    }
  }
`;

export const DELETE_LINK = gql`
  mutation ($clubId: ID!, $data: DeleteLinkArgs!) {
    deleteLink(clubId: $clubId, data: $data) {
      id
    }
  }
`;

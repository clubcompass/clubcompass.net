import { gql } from "@apollo/client";

export const GET_TAGS = gql`
  query getTags {
    getTags {
      id
      name
      approvedCount
    }
  }
`;

export const CREATE_TAGS = gql`
  mutation CreateTags($names: [String!]) {
    createTags(names: $names) {
      count
    }
  }
`;

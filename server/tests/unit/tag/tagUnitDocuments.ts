import { gql } from "@apollo/client";

export const findManyTags = gql`
  query {
    findManyTag {
      id
      name
    }
  }
`;

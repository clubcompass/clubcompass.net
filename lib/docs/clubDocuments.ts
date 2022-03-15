import { gql } from "@apollo/client";

export const GET_CLUBS = gql`
  query getClubs {
    getClubs {
      id
      slug
      name
      description
      tags {
        name
      }
      _count {
        members
      }
    }
  }
`;

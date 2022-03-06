import { gql } from "apollo-server-micro";

export const clubSchema = gql`
  extend type Query {
    t(length: Int, limit: Int): [Club!]!
  }

  extend type Mutation {
    z(word: String!, wordLength: Int!): Club!
  }
`;

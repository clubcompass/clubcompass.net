import { gql } from "apollo-server-micro";
export const userSchema = gql`
  extend type Query {
    getWords(length: Int, limit: Int): [User!]!
    randomWord(length: Int!): User!
    isValidWord(word: String!): Boolean!
  }

  extend type Mutation {
    addWord(word: String!, wordLength: Int!): User!
  }
`;

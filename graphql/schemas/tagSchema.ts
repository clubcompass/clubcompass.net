import { gql } from "apollo-server-micro";

export const tagSchema = gql`
  extend type Mutation {
    createTags(tags: [String!]!): Int!
  }
`;

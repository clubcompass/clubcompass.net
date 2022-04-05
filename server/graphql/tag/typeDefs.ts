import gql from "graphql-tag";
// Tag typedef
export default gql`
  ##### GET TAGS #####

  type GetTagsPayload {
    id: ID!
    name: String!
    approvedCount: Int!
  }

  ##### END OF GET TAGS #####

  ##### CREATE MANY TAGS #####

  type createManyPayload {
    count: Int!
  }

  ##### END OF CREATE MANY TAGS #####

  ##### SHARED #####

  type Tag {
    id: ID!
    name: String!
    clubs: [Club!]
    interestedUsers: [User!]
  }

  ##### END OF SHARED #####

  ##### QUERIES + MUTATIONS #####

  type Query {
    getTags(approved: Boolean): [GetTagsPayload!]!
  }

  type Mutation {
    createTags(names: [String!]): createManyPayload!
  }

  ##### END OF QUERIES + MUTATIONS #####
`;

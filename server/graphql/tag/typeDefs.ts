import gql from "graphql-tag";
// Tag typedef
export default gql`
  type Tag {
    id: ID!
    name: String!
    clubs: [Club!]
    interestedUsers: [User!]
  }

  type GetTagsPayload {
    id: ID!
    name: String!
    approvedCount: Int!
  }

  type createManyPayload {
    count: Int!
  }

  type Query {
    getTags(approved: Boolean): [GetTagsPayload!]!
  }

  type Mutation {
    createTags(names: [String!]): createManyPayload!
  }
`;

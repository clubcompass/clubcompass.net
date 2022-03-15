import gql from "graphql-tag";
// Tag typedef
export default gql`
  type Tag {
    id: Int!
    name: String!
    clubs: [Club!]
    interestedUsers: [User!]
  }

  type GetTagsPayload {
    id: Int!
    name: String!
    approvedCount: Int!
  }

  type Query {
    getTags(approved: Boolean): [GetTagsPayload!]!
  }
`;

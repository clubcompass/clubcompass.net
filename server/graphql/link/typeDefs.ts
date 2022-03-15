import gql from "graphql-tag";
export default gql`
  type Link {
    id: Int!
    club: Club!
    clubId: Int!
    name: String
    link: String!
    type: String!
  }
`;

import gql from "graphql-tag";
export default gql`
  type Role {
    id: Int!
    name: String!
    color: String!
    description: String!
    users: [User!]
    club: [Club!]
    clubId: Int!
    type: [RoleType!]!
  }

  enum RoleType {
    MEMBER
    LEADER
  }
`;

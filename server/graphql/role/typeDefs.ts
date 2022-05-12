import gql from "graphql-tag";
export default gql`
  ##### SHARED ######

  type Role {
    id: ID!
    name: String!
    color: String!
    description: String!
    users: [User!]
    club: [Club!]
    clubId: ID!
    type: RoleType!
  }

  enum RoleType {
    MEMBER
    LEADER
    ADVISOR
  }

  ##### END OF SHARED #####
`;

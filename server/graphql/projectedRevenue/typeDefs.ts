import gql from "graphql-tag";
export default gql`
  type ProjectedRevenue {
    id: ID!
    club: ClubApplicationInfo
    clubId: ID
    name: String
    amount: Float
    date: String
  }
`;

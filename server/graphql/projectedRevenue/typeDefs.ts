import gql from "graphql-tag";
export default gql`
  type ProjectedRevenue {
    id: Int!
    club: ClubApplicationInfo
    clubId: Int
    name: String
    amount: Float
    date: String
  }
`;

import gql from "graphql-tag";
export default gql`
  type ProjectedExpenses {
    id: ID!
    club: ClubApplicationInfo
    clubId: ID
    name: String
    amount: Float
    date: String
  }
`;

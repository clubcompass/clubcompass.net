import { gql } from "apollo-server-micro";
export const userSchema = gql`
  extend type Mutation {
    createCustomUser(
      firstname: String!
      lastname: String!
      email: String!
      emailVerified: Boolean!
      password: String!
      grade: String!
      type: String!
      interests: [Interest!]!
    ): User!
  }

  input Interest {
    id: Int!
    name: String
  }
`;

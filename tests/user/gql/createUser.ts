import { gql } from "apollo-server-micro";

export const createUserDocument = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $emailVerified: Boolean!
    $password: String!
    $grade: String!
    $type: String!
    $interests: [Interest!]!
  ) {
    createCustomUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      emailVerified: $emailVerified
      password: $password
      grade: $grade
      type: $type
      interests: $interests
    ) {
      id
    }
  }
`;

import gql from "graphql-tag";
export default gql`
  type AuthPayload {
    user: User
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
    remember: Boolean!
  }

  input RegisterInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    grade: String!
    interests: [Interest!]
  }

  input Interest {
    id: Int
    name: String
  }

  type Mutation {
    register(data: RegisterInput!): AuthPayload!
    login(data: LoginInput!): AuthPayload!
  }
`;

import gql from "graphql-tag";
export default gql`
  input LoginArgs {
    email: String!
    password: String!
    remember: Boolean!
  }

  input RegisterArgs {
    firstname: String!
    lastname: String!
    email: String!
    studentId: String!
    password: String!
    grade: String!
    interests: [Interest!]
  }

  type AuthenticatedUserPayload {
    id: ID!
    ccid: String!
    firstname: String!
    lastname: String!
    email: String!
    grade: String!
    type: String!
    emailVerified: Boolean!
    active: Boolean!
    token: String!
    pendingInvites: Int!
  }

  input Interest {
    id: ID
    name: String
  }

  type Mutation {
    register(data: RegisterArgs!): AuthenticatedUserPayload!
    login(data: LoginArgs!): AuthenticatedUserPayload!
    logout: Boolean!
    changePassword(password: String!): User!
  }

  type Query {
    checkEmail(email: String!): Boolean!
    checkStudentId(studentId: String!): Boolean!
    findUserBySession: AuthenticatedUserPayload!
    sendVerificationEmail(email: String!): Boolean!
  }
`;

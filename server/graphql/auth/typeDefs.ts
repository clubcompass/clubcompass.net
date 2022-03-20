import gql from "graphql-tag";
export default gql`
  type RegisterPayload {
    user: User!
    token: String!
  }

  type LoginPayload {
    user: User!
    token: String!
  }

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

  type SessionUser {
    id: ID!
    ccid: String
    firstname: String
    lastname: String
    email: String
    grade: String
    type: String
    emailVerified: Boolean
    active: Boolean
    pendingInvites: Int
    clubs: [Club!]!
  }

  input Interest {
    id: ID
    name: String
  }

  type Mutation {
    register(data: RegisterArgs!): RegisterPayload!
    login(data: LoginArgs!): LoginPayload!
    changePassword(password: String!): User!
  }

  type Query {
    checkEmail(email: String!): Boolean!
    checkStudentId(studentId: String!): Boolean!
    findUserBySession: SessionUser!
    sendVerificationEmail(email: String!): Boolean!
  }
`;

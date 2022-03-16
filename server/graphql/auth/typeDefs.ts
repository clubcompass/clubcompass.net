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
    id: Int!
    ccid: String
    firstname: String
    lastname: String
    email: String
    grade: String
    type: String
    pendingInvites: Int
    clubs: [Club!]!
  }

  input Interest {
    id: Int
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
  }
`;

import { gql } from "@apollo/client";

// auth payload fragment ?

export const REGISTER = gql`
  mutation register($data: RegisterArgs!) {
    register(data: $data) {
      user {
        id
        ccid
        firstname
        lastname
        email
        emailVerified
        password
        grade
        type
      }
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($data: LoginArgs!) {
    login(data: $data) {
      user {
        id
        ccid
        firstname
        lastname
        email
        emailVerified
        password
        grade
        type
      }
      token
    }
  }
`;

export const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

export const CHECK_STUDENT_ID = gql`
  query checkStudentId($studentId: String!) {
    checkStudentId(studentId: $studentId)
  }
`;

export const FIND_USER_BY_SESSION = gql`
  query findUserBySession {
    findUserBySession {
      id
      ccid
      firstname
      lastname
      email
      emailVerified
      active
      type
      pendingInvites
      # clubs {
      #   id
      # }
    }
  }
`;

export const SEND_VERIFICATION_EMAIL = gql`
  query SendVerificationEmail($email: String!) {
    sendVerificationEmail(email: $email)
  }
`;

// change password

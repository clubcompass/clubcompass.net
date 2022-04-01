import { gql } from "@apollo/client";

// auth payload fragment ?
export const AUTH_PAYLOAD_FRAGMENT = gql`
  fragment AuthPayload on AuthenticatedUserPayload {
    id
    ccid
    firstname
    lastname
    email
    emailVerified
    active
    type
    pendingInvites
    token
  }
`;

export const REGISTER = gql`
  mutation register($data: RegisterArgs!) {
    register(data: $data) {
      ...AuthPayload
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;

export const LOGIN = gql`
  mutation login($data: LoginArgs!) {
    login(data: $data) {
      ...AuthPayload
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;

export const LOGOUT = gql`
  mutation logout {
    logout
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
      ...AuthPayload
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`;

export const SEND_VERIFICATION_EMAIL = gql`
  query SendVerificationEmail($email: String!) {
    sendVerificationEmail(email: $email)
  }
`;

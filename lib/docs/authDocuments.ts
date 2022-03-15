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
        # firstname
        # lastname
        # email
        # emailVerified
        # password
        # grade
        # type
      }
      token
    }
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
      type
      pendingInvites
      # clubs {
      #   id
      # }
    }
  }
`;

// change password

import { gql } from "@apollo/client";

// auth payload fragment ?

export const register = gql`
  mutation register($data: RegisterInput!) {
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

export const login = gql`
  mutation login($data: LoginInput!) {
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

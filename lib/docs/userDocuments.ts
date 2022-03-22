import { gql } from "@apollo/client";

export const VALIDATE_USER = gql`
  query ($ccid: String!) {
    validateUser(ccid: $ccid) {
      id
      firstname
      lastname
    }
  }
`;

export const GET_USER_CLUBS = gql`
  query {
    getUserClubs {
      id
      name
      slug
      description
      tags {
        name
      }
      _count {
        members
      }
    }
  }
`;

export const GET_USER_LEADERSHIP_CLUBS = gql`
  query {
    getUserLeadershipClubs {
      hasEditorIn {
        id
        name
        slug
        description
        tags {
          name
        }
        _count {
          members
        }
      }
      hasLeadershipIn {
        id
        name
        slug
        description
        tags {
          name
        }
        _count {
          members
        }
      }
      isPresidentOf {
        id
        name
        slug
        description
        tags {
          name
        }
        _count {
          members
        }
      }
    }
  }
`;

export const UPDATE_USER_INTERESTS = gql`
  mutation ($id: ID!, $tags: [TagInput!]!) {
    updateUserInterests(id: $id, tags: $tags) {
      name
    }
  }
`;

export const APPROVE_USER = gql`
  mutation ($userId: ID!) {
    approveUser(userId: $userId) {
      id
      firstname
      lastname
      active
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($identifier: DeleteUserArgs!) {
    deleteUser(identifier: $identifier) {
      id
    }
  }
`;

export const GET_USERS = gql`
  query ($active: Boolean) {
    getUsers(active: $active) {
      id
      fullname
      email
      studentId
      grade
    }
  }
`;

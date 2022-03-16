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
  mutation ($id: Int!, $tags: [TagInput!]!) {
    updateUserInterests(id: $id, tags: $tags) {
      name
    }
  }
`;

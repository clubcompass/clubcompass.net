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

export const GET_USER = gql`
  query GetUser($identifier: GetUserIdentifierArgs!, $type: UserType) {
    getUser(identifier: $identifier, type: $type) {
      id
      firstname
      lastname
      email
      type
    }
  }
`;

export const GET_USER_CLUBS = gql`
  query GetUserClubs {
    getUserClubs {
      leaderOf {
        presidentOf {
          id
          slug
          name
          location
          status
          roles {
            name
          }
        }
        editorOf {
          id
          slug
          name
          location
          status
          roles {
            name
          }
        }
        cantEdit {
          id
          slug
          name
          location
          status
          roles {
            name
          }
        }
      }
      memberOf {
        id
        slug
        name
        location
        status
        roles {
          name
        }
      }
      drafts {
        id
        name
        slug
        todos
      }
    }
  }
`;

export const GET_USER_DRAFTS = gql`
  query GetUserDrafts {
    getUserDrafts {
      id
      name
      slug
      todos
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
      firstname
      lastname
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
      delete {
        id
        name # fullname?
        type
      }
    }
  }
`;

export const GET_ADVISOR_CLUBS = gql`
  query {
    getAdvisorClubs {
      id
      slug
      name
      status
      location
      meetingDate
    }
  }
`;

export const BATCH_APPROVE_USERS = gql`
  mutation BatchApproveUsers($userIds: [ID!]!) {
    batchApproveUsers(userIds: $userIds) {
      firstname
      lastname
      active
    }
  }
`;

export const BATCH_DELETE_USERS = gql`
  mutation ($userIds: [ID!]!) {
    batchDeleteUsers(userIds: $userIds) {
      firstname
      lastname
      studentId
    }
  }
`;

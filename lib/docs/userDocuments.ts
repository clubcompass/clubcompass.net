import { gql } from "@apollo/client";

export const VALIDATE_USER = gql`
  query ($ccid: String!) {
    validateUser(ccid: $ccid) {
      id
      firstname
      lastname
      ccid
      email
      type
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

export const GET_USER_PROFILE = gql`
  query {
    getUserProfile {
      grade
      studentId
      interests {
        name
      }
    }
  }
`;

export const GET_USER_CLUBS = gql`
  query {
    getUserClubs {
      leaderOf {
        id
        slug
        name
        meetingDate
        location
        status
        roles {
          name
        }
        president
        manage
      }
      memberOf {
        id
        slug
        name
        meetingDate
        location
        status
        roles {
          name
        }
        president
        manage
      }
      drafts {
        id
        name
        slug
        status
        tasks {
          message
          completed
        }
        completed
        total
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

export const UPDATE_USER_ROLES = gql`
  mutation UpdateUserRoles($userId: ID!, $clubId: ID!, $roles: [RoleInput!]) {
    updateUserRoles(userId: $userId, clubId: $clubId, roles: $roles) {
      status
      message
    }
  }
`;

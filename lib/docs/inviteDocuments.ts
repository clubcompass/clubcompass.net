import { gql } from "@apollo/client";

export const ACCEPT_INVITE = gql`
  mutation ($inviteId: ID!, $clubId: ID!) {
    acceptInvite(inviteId: $inviteId, clubId: $clubId) {
      id
      clubName
    }
  }
`;

export const DECLINE_INVITE = gql`
  mutation ($inviteId: ID!) {
    declineInvite(inviteId: $inviteId) {
      id
      clubName
    }
  }
`;

export const ACCEPT_TEACHER_INVITE = gql`
  mutation ($inviteId: ID!, $clubId: ID!) {
    acceptTeacherInvite(inviteId: $inviteId, clubId: $clubId) {
      id
      clubName
    }
  }
`;

export const DELETE_INCOMING_INVITE = gql`
  mutation DeleteIncomingInvite($inviteId: ID!) {
    deleteIncomingInvite(inviteId: $inviteId) {
      id
    }
  }
`;

export const DELETE_OUTGOING_INVITE = gql`
  mutation ($inviteId: ID!) {
    deleteOutgoingInvite(inviteId: $inviteId) {
      id
    }
  }
`;

export const ISSUE_INVITE = gql`
  mutation ($clubId: ID!, $recipientCcid: String!, $inviteRoles: [RoleInput!]) {
    issueInvite(
      clubId: $clubId
      recipientCCID: $recipientCcid
      inviteRoles: $inviteRoles
    ) {
      id
    }
  }
`;

export const ISSUE_TEACHER_INVITE = gql`
  mutation ($clubId: ID!, $recipientCcid: String!) {
    issueTeacherInvite(clubId: $clubId, recipientCCID: $recipientCcid) {
      id
    }
  }
`;

export const GET_USER_INVITES = gql`
  query GetUserInvites {
    getUserInvites {
      incoming {
        pending {
          id
          club {
            id
            name
            slug
            description
            status
          }
          roles {
            name
          }
          type
          status
          createdAt
        }
        accepted {
          id
          club {
            id
            name
            slug
            description
            status
          }
          roles {
            name
          }
          type
          status
          createdAt
        }
        declined {
          id
          club {
            id
            name
            slug
            description
            status
          }
          roles {
            name
          }
          type
          status
          createdAt
        }
      }
      outgoing {
        pending {
          id
          club {
            id
            name
            slug
            description
            status
          }
          roles {
            name
          }
          type
          status
          createdAt
        }
        accepted {
          id
          club {
            id
            name
            slug
            description
            status
          }
          roles {
            name
          }
          type
          status
          createdAt
        }
        declined {
          id
          club {
            id
            name
            slug
            description
            status
          }
          roles {
            name
          }
          type
          status
          createdAt
        }
      }
    }
  }
`;

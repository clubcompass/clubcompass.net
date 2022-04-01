import { gql } from "@apollo/client";

export const ISSUE_INVITE = gql`
  mutation ($clubId: ID!, $recipientCcid: String!) {
    issueInvite(clubId: $clubId, recipientCCID: $recipientCcid) {
      id
    }
  }
`;

export const ACCEPT_INVITE = gql`
  mutation ($inviteId: ID!, $clubId: ID!) {
    acceptInvite(inviteId: $inviteId, clubId: $clubId) {
      id
    }
  }
`;

export const DECLINE_INVITE = gql`
  mutation ($inviteId: ID!) {
    declineInvite(inviteId: $inviteId) {
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
            description
            status
          }
          roles {
            name
          }
          type
          status
        }
        accepted {
          id
          club {
            id
            name
            description
            status
          }
          roles {
            name
          }
          type
          status
        }
        declined {
          id
          club {
            id
            name
            description
            status
          }
          roles {
            name
          }
          type
          status
        }
      }
      outgoing {
        pending {
          id
          club {
            id
            name
            description
            status
          }
          roles {
            name
          }
          type
          status
        }
        accepted {
          id
          club {
            id
            name
            description
            status
          }
          roles {
            name
          }
          type
          status
        }
        declined {
          id
          club {
            id
            name
            description
            status
          }
          roles {
            name
          }
          type
          status
        }
      }
    }
  }
`;

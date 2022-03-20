import { gql } from "@apollo/client";

export const ISSUE_INVITE = gql`
  mutation ($clubId: Int!, $recipientCcid: String!) {
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
  query {
    getUserInvites {
      acceptedInvites {
        id
        status
        club {
          id
          name
          description
          status
        }
      }
      pendingInvites {
        id
        status
        club {
          id
          name
          description
          status
        }
      }
      declinedInvites {
        id
        status
        club {
          id
          name
          description
          status
        }
      }
    }
  }
`;

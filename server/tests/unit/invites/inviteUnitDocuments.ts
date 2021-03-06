import { gql } from "@apollo/client";

export const GET_USER_INVITES = gql`
  query {
    getUserInvites {
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

export const ISSUE_INVITE = gql`
  mutation ($clubId: ID!, $recipientId: ID!) {
    issueInvite(clubId: $clubId, recipientId: $recipientId) {
      userId
      id
      clubId
      status
    }
  }
`;

export const ACCEPT_INVITE = gql`
  mutation acceptInvite($inviteId: ID!, $clubId: ID!) {
    acceptInvite(inviteId: $inviteId, clubId: $clubId) {
      id
      name
    }
  }
`;

export const DECLINE_INVITE = gql`
  mutation declineInvite($inviteId: ID!) {
    declineInvite(inviteId: $inviteId) {
      id
    }
  }
`;

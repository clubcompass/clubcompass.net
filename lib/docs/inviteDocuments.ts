import { gql } from "@apollo/client";

export const ISSUE_INVITE = gql`
  mutation ($clubId: Int!, $recipientCcid: String!) {
    issueInvite(clubId: $clubId, recipientCCID: $recipientCcid) {
      id
    }
  }
`;

export const ACCEPT_INVITE = gql`
  mutation ($inviteId: Int!, $clubId: Int!) {
    acceptInvite(inviteId: $inviteId, clubId: $clubId) {
      id
      firstname
      lastname
    }
  }
`;

export const DECLINE_INVITE = gql`
  mutation ($inviteId: Int!) {
    declineInvite(inviteId: $inviteId) {
      id
      firstname
      lastname
    }
  }
`;

export const GET_USER_INVITES = gql`
  query {
    getUserInvites {
      acceptedInvites {
        id
        club {
          name
          description
          status
        }
      }
      pendingInvites {
        id
        club {
          name
          description
          status
        }
      }
      declinedInvites {
        id
        club {
          name
          description
          status
        }
      }
    }
  }
`;

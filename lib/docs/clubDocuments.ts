import { gql } from "@apollo/client";

export const GET_APPROVED_CLUBS = gql`
  query {
    getApprovedClubs {
      name
      slug
      description
      availability
      tags {
        name
      }
      _count {
        members
      }
    }
  }
`;

export const GET_UNAPPROVED_CLUBS = gql`
  query GetUnapprovedClubs {
    getUnapprovedClubs {
      id
      name
      availability
      createdAt
      roles {
        name
        users {
          firstname
          lastname
        }
      }
      teacher {
        firstname
        lastname
      }
    }
  }
`;

export const GET_CLUB = gql`
  query getClub($slug: String) {
    getClub(slug: $slug) {
      id
      name
      description
      meetingDate
      location
      availability
      _count {
        members
      }
      tags {
        name
      }
      links {
        name
        link
        type
      }
      members {
        firstname
        lastname
        roles {
          name
          type
        }
      }
    }
  }
`;

export const EDIT_CLUB = gql`
  mutation ($clubId: Int!, $data: EditClubArgs!) {
    editClub(clubId: $clubId, data: $data) {
      id
      name
      description
      tags {
        name
      }
      description
      meetingDate
      location
      availability
      links {
        name
        link
        type
      }
      members {
        firstname
        lastname
        roles {
          name
          type
        }
      }
    }
  }
`;

export const JOIN_CLUB = gql`
  mutation ($clubId: ID!) {
    joinClub(clubId: $clubId) {
      id
      firstname
      lastname
      clubs {
        id
        name
      }
    }
  }
`;

export const LEAVE_CLUB = gql`
  mutation ($clubId: Int!) {
    leaveClub(clubId: $clubId) {
      id
      firstname
      lastname
      clubs {
        id
        name
      }
    }
  }
`;

export const DELETE_CLUB = gql`
  mutation ($clubId: Int!) {
    deleteClub(clubId: $clubId) {
      id
      name
    }
  }
`;

export const SEND_CLUB_FOR_APPROVAL = gql`
  mutation ($clubId: ID!) {
    sendClubForApproval(clubId: $clubId) {
      id
      name
      status
    }
  }
`;

export const APPROVE_CLUB = gql`
  mutation ($clubId: ID!) {
    approveClub(clubId: $clubId) {
      id
      name
      approval
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_APPROVED_CLUBS = gql`
  query {
    getApprovedClubs {
      id
      name
      slug
      description
      availability
      isMember
      tags {
        id
        name
      }
      _count {
        members
      }
    }
  }
`;

export const GET_ADMIN_APPROVED_CLUBS = gql`
  query {
    getAdminApprovedClubs {
      name
      slug
      availability
      updatedAt
      president
      teacher
      members
      delete {
        id
        name
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
      president
      teacher
    }
  }
`;

export const GET_CLUB = gql`
  query getClub($slug: String, $id: ID) {
    getClub(slug: $slug, id: $id) {
      id
      name
      description
      email
      meetingDate
      location
      availability
      status
      isMember
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
          color
        }
      }
    }
  }
`;

export const CREATE_CLUB = gql`
  mutation ($data: CreateClubArgs!) {
    createClub(data: $data) {
      id
      name
      slug
      description
      email
      meetingDate
      location
      availability
      tags {
        name
      }
      _count {
        members
      }
      status
      approval
    }
  }
`;

export const EDIT_CLUB = gql`
  mutation ($clubId: ID!, $data: EditClubArgs!) {
    editClub(clubId: $clubId, data: $data) {
      id
      name
      slug
      description
      email
      meetingDate
      location
      availability
      tags {
        name
      }
      _count {
        members
      }
      status
      approval
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
  mutation ($clubId: ID!) {
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
  mutation ($clubId: ID!) {
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

export const DECLINE_CLUB = gql`
  mutation ($clubId: ID!) {
    declineClub(clubId: $clubId) {
      id
      name
      approval
    }
  }
`;

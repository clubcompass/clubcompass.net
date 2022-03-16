import { gql } from "@apollo/client";

export const GET_CLUBS = gql`
  query getClubs {
    getClubs {
      id
      slug
      name
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
  mutation ($clubId: Int!) {
    joinClub(clubId: $clubId) {
      id
      firstname
      lastname
    }
  }
`;

export const LEAVE_CLUB = gql`
  mutation ($clubId: Int!) {
    leaveClub(clubId: $clubId) {
      id
      firstname
      lastname
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

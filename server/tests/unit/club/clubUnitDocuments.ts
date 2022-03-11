import { gql } from "@apollo/client";

export const findApprovedClubs = gql`
  query {
    findManyClub(where: { approval: { equals: "APPROVED" } }) {
      slug
      name
      approval
      description
      availability
      _count {
        members
      }
      tags {
        name
      }
    }
  }
`;

export const findClubBySlug = gql`
  query findClubBySlug($where: ClubWhereUniqueInput!) {
    findUniqueClub(where: $where) {
      name
      description
      meetingDate
      location
      availability
      approval
      links {
        name
        type
        link
      }
      members {
        firstname
        lastname
        roles {
          name
          type
        }
      }
      tags {
        name
      }
    }
  }
`;

export const createClubMinimumInfo = gql`
  mutation {
    createOneClub(data: { name: "Abhinav's Literature Club" }) {
      id
      name
    }
  }
`;

import { DocumentNode } from "graphql";
import { gql } from "@apollo/client";

export const ClubFields = gql`
  fragment ClubFields on Club {
    id
    name
    slug
    description
    email
    meetingDate
    location
    approval
    status
    availability
  }
`;

export const ClubApplicationInfoFields = gql`
  fragment ClubApplicationInfoFields on ClubApplicationInfo {
    id
    userId
    clubId
    purpose
    membershipRequirements
    dutiesOfMembers
    titlesAndDutiesOfOfficers
    selectionOfOfficers
    officerMinimumGPA
    percentAttendanceForOfficialMeeting
    percentAttendanceToApproveDecision
  }
`;

export const UserFields = gql`
  fragment UserFields on User {
    id
    ccid
    firstname
    lastname
    email
    emailVerified
    password
    grade
    type
  }
`;

export const InviteFields = gql`
  fragment InviteFields on Invite {
    id
    status
    clubId
    userId
  }
`;

export const TagFields = gql`
  fragment TagFields on Tag {
    id
    name
  }
`;

export const LinkFields = gql`
  fragment LinkFields on Link {
    id
    clubId
    name
    link
    type
  }
`;

export const ProjectedRevenueFields = gql`
  fragment ProjectedRevenueFields on ProjectedRevenue {
    id
    clubId
    name
    amount
    date
  }
`;

export const ProjectedExpensesFields = gql`
  fragment ProjectedExpensesFields on ProjectedExpenses {
    id
    clubId
    name
    amount
    date
  }
`;

export const RoleFields = gql`
  fragment RoleFields on Role {
    id
    name
    color
    description
    clubId
    type
  }
`;

export const Role = gql`
  fragment Role on Role {
    ...RoleFields
    club {
      ...ClubFields
    }
  }
  ${RoleFields}
  ${ClubFields}
`;

export const ProjectedRevenue = gql`
  fragment ProjectedRevenue on ProjectedRevenue {
    ...ProjectedRevenueFields
    club {
      ...ClubApplicationInfoFields
    }
  }
  ${ClubApplicationInfoFields}
  ${ProjectedRevenueFields}
`;

export const ProjectedExpenses = gql`
  fragment ProjectedExpenses on ProjectedExpenses {
    ...ProjectedExpensesFields
    club {
      ...ClubApplicationInfoFields
    }
  }
  ${ClubApplicationInfoFields}
  ${ProjectedExpensesFields}
`;

export const Invite = gql`
  fragment Invite on Invite {
    ...InviteFields
    club {
      ...ClubFields
    }
    user {
      ...UserFields
    }
  }
  ${InviteFields}
  ${ClubFields}
  ${UserFields}
`;

export const User = gql`
  fragment User on User {
    ...UserFields
  }
  ${UserFields}
`;

export const Link = gql`
  fragment Link on Link {
    ...LinkFields
    club {
      ...ClubFields
    }
  }
  ${LinkFields}
  ${ClubFields}
`;

export const Tag = gql`
  fragment Tag on Tag {
    ...TagFields
  }
  ${TagFields}
`;

export const ClubApplicationInfo = gql`
  fragment ClubApplicationInfo on ClubApplicationInfo {
    ...ClubApplicationInfoFields
    teacher {
      ...UserFields
    }
    club {
      ...ClubFields
    }
  }
  ${ClubApplicationInfoFields}
  ${UserFields}
  ${ClubFields}
`;

export const Club = gql`
  fragment Club on Club {
    applicationInfo {
      ...ClubApplicationInfoFields
    }
    ...ClubFields
  }
  ${ClubApplicationInfoFields}
  ${ClubFields}
`;

export const fragments: { [key: string]: DocumentNode } = {
  ClubApplicationInfo,
  Club,
  User,
};

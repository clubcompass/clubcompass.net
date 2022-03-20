import gql from "graphql-tag";
export default gql`
  type ClubApplicationInfo {
    id: ID!
    teacher: User
    userId: ID
    club: Club
    clubId: ID
    projectedRevenue: [ProjectedRevenue!]
    projectedExpenses: [ProjectedExpenses!]
    purpose: String
    membershipRequirements: String
    dutiesOfMembers: String
    titlesAndDutiesOfOfficers: String
    selectionOfOfficers: String
    officerMinimumGPA: Float
    percentAttendanceForOfficialMeeting: Int
    percentAttendanceToApproveDecision: Int
  }
`;

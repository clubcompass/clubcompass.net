import gql from "graphql-tag";
export default gql`
  type ClubApplicationInfo {
    id: Int!
    teacher: User
    userId: Int
    club: Club
    clubId: Int
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

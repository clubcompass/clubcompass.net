import React from "react";
import { DashboardUserClubs as UserClubs } from "../../components/pages/dashboard/home";
import { DashboardUserDrafts as UserDrafts } from "../../components/pages/dashboard/home";
import { useAuthContext } from "../../context";

const Dashboard = () => {
  const clubs = {
    leaderOf: [
      {
        name: "Club name",
        description: "Club description",
        roles: ["president"],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: true,
      },
      {
        name: "Club name",
        description: "Club description",
        roles: ["president"],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: true,
      },
      {
        name: "Club name",
        description: "Club description",
        roles: ["vice president"],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: true,
      },
      {
        name: "Club name",
        description: "Club description",
        roles: ["treasurer"],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: false,
      },
    ],
    memberOf: [
      {
        name: "Club name",
        description: "Club description",
        roles: [],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: false,
      },
      {
        name: "Club name",
        description: "Club description",
        roles: [],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: false,
      },
      {
        name: "Club name",
        description: "Club description",
        roles: [],
        status: "APPROVED",
        location: "A101",
        meetingDate: "Bi-weekly on Mondays",
        canEdit: false,
      },
    ],
    drafts: [
      {
        name: "Club name poopy mc pooperson",
        slug: "club-name",
        tasks: [
          { message: "Provide a description", completed: false },
          { message: "Provide a location", completed: false },
          { message: "Provide a location", completed: false },
          { message: "Provide a meeting date", completed: false },
          { message: "Provide a meeting date", completed: true },
          { message: "Provide a meeting date", completed: true },
          { message: "Provide a meeting date", completed: true },
        ],
        completed: 4,
        total: 7,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <UserClubs clubs={clubs.memberOf} />
      <UserDrafts clubs={clubs.drafts} />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default Dashboard;

import React from "react";
import { DashboardUserClubs as UserClubs } from "../../components/pages/dashboard/home";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UserClubs />
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

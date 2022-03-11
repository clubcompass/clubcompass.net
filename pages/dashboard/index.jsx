import React from "react";
import { DashboardUserClubs as UserClubs } from "../../components/pages/dashboard/home";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
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

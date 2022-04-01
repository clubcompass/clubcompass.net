import React from "react";
import { DashboardUserClubs as UserClubs } from "../../components/pages/dashboard/home";

const Dashboard = () => {
  // error handle email verification failed
  return (
    <div className="flex flex-col">
      <h1 className="font-bold uppercase text-[#626262]">Dashboard</h1>
      <UserClubs />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
      protected: true,
    },
  };
};

export default Dashboard;

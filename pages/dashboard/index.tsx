import React from "react";
import { DashboardUserClubs as UserClubs } from "../../components/pages/dashboard/home";
import { useAuthContext } from "../../context";

const Dashboard = () => {
  // const { users } = useAuthContext(); // user should never be null

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
    },
  };
};

export default Dashboard;

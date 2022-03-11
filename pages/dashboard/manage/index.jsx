import React from "react";
import { DashboardOwnerOfClubs as OwnerOfClubs } from "../../../components/pages/dashboard/manage";
import { DashboardDrafts } from "../../../components/pages/dashboard/manage/DashboardDrafts";

const Manage = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h4 className="text-2xl tracking-wide">Manage your clubs</h4>
      <DashboardDrafts />
      <OwnerOfClubs />
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

export default Manage;

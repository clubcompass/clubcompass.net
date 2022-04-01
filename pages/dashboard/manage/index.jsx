import React from "react";
import { DashboardOwnerOfClubs as OwnerOfClubs } from "../../../components/pages/dashboard/manage";
import { DashboardDrafts } from "../../../components/pages/dashboard/manage/DashboardDrafts";

const Manage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold uppercase text-[#626262]">Manage</h1>
      <DashboardDrafts />
      <OwnerOfClubs />
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

export default Manage;

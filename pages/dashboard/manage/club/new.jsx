import React from "react";
import { DashboardNewClub as NewClub } from "../../../../components/pages/dashboard/manage/new";
const New = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create New Club</h1>
      <div className="flex flex-col gap-4">
        <NewClub />
      </div>
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

export default New;

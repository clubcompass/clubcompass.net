import React from "react";
import { DashboardNewClub as NewClub } from "../../../../components/pages/dashboard/manage/new";
import {
  DashboardNewBase,
  DashboardNewMembers,
} from "../../../../components/pages/dashboard/manage/new";
const New = () => {
  // should just be dashboard/new?
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Create New Club</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <DashboardNewBase />
          </div>
        </div>
      </div>
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

export default New;

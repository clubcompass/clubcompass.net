import React from "react";
import { DashboardSummaryEditButton as EditButton } from "./DashboardSummaryEditButton";

export const DashboardSummaryMembers = () => {
  return (
    <div className="w-[480px] border-b pb-4">
      <div className="flex items-center gap-4">
        <h5 className="text-gray-400">Members and Advisors</h5>
        <EditButton value={1} />
      </div>
      <div className="w-[80vw]">Members compoent here</div>
    </div>
  );
};

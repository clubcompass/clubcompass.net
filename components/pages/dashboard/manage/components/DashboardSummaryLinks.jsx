import React from "react";
import { DashboardLinks } from "./DashboardLinks";
import { DashboardSummaryEditButton as EditButton } from "./DashboardSummaryEditButton";

export const DashboardSummaryLinks = ({ links }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-[480px] items-center gap-4">
        <h5 className="text-gray-400">Links</h5>
        <EditButton value={2} />
      </div>
      <DashboardLinks links={links} />
    </div>
  );
};

import React from "react";
import { DashboardUserCard } from "./DashboardUserCard";

export const DashboardUserWrapper = ({ children }) => {
  return (
    <div className="flex flex-col justify-items-center gap-6 md:grid md:grid-cols-dashboardCards">
      {children}
    </div>
  );
};

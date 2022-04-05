import React from "react";
import { NavigationLayout, DashboardNavigationLayout } from ".";
export const Layout = ({ layout, children }) => {
  // layout options: "none", "dashboard", "site"
  if (layout === "none") {
    return <>{children}</>;
  }
  if (layout === "site") {
    return <NavigationLayout>{children}</NavigationLayout>;
  }
  if (layout === "dashboard") {
    return <DashboardNavigationLayout>{children}</DashboardNavigationLayout>;
  }
  return <>{children}</>;
};

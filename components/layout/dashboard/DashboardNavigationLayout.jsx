import React from "react";
import { DashboardNav } from "./navigation";
export const DashboardNavigationLayout = ({ children }) => {
  return (
    <Container>
      <DashboardNav />
      <div className="min-h-screen w-full bg-white py-6 pl-[280px] pr-[30px]">
        {children}
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex w-full flex-row">{children}</div>
);

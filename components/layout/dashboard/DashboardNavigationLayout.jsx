import React from "react";
import { DashboardNav } from "./navigation";
export const DashboardNavigationLayout = ({ children }) => {
  return (
    <Container>
      <DashboardNav />
      <div className="bg-[#FAFAFA] py-6 min-h-screen w-full pl-[280px] pr-[30px]">
        {children}
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex flex-row w-full">{children}</div>
);

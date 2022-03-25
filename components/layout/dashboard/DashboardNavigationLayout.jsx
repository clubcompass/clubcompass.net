import React from "react";
import { DashboardNav } from "./navigation";
import { useBreakpoints } from "../../../hooks";

export const DashboardNavigationLayout = ({ children }) => {
  return (
    <Container>
      <DashboardNav />
      <div className="min-h-screen w-full bg-[#FAFAFA] py-6 pr-[30px] pl-[80px] md:pl-[280px]">
        {children}
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex w-full flex-row">{children}</div>
);

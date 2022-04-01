import React from "react";
// import { ToastProvider } from "../../../context";
import { DashboardNav } from "./navigation";
import { DashboardHeader } from "./navigation/header";
import { useBreakpoints } from "../../../hooks";

export const DashboardNavigationLayout = ({ children }) => {
  return (
    <Container>
      <DashboardNav />
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="w-full min-w-[364px] py-6 pr-[20px] pl-[80px] md:pr-[40px] md:pl-[140px]">
          {children}
        </div>
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex w-full flex-row">{children}</div>
);

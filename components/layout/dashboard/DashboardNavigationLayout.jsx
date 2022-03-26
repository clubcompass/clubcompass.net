import React from "react";
// import { ToastProvider } from "../../../context";
import { DashboardNav } from "./navigation";
export const DashboardNavigationLayout = ({ children }) => {
  return (
    // <ToastProvider>
    <Container>
      <DashboardNav />
      <div className="min-h-screen w-full bg-[#FAFAFA] py-6 pl-[280px] pr-[30px]">
        {children}
      </div>
      {/* </ToastProvider> */}
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex w-full flex-row">{children}</div>
);

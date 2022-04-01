import React, { useEffect } from "react";
import { DashboardHeaderBack as BackButton } from "./DashboardHeaderBack";
import { DashboardHeaderContent as Content } from "./DashboardHeaderContent";
import { useBreakpoints } from "../../../../../hooks";

export const DashboardHeader = () => {
  return (
    <Container>
      <BackButton />
      <Content />
    </Container>
  );
};

const Container = ({ children }) => {
  return (
    <div className="flex h-[100px] w-screen flex-col gap-1 border-b pt-6 pl-[80px] md:pl-[140px]">
      {children}
    </div>
  );
};

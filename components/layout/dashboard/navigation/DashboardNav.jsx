import React, { useEffect } from "react";
import { useBreakpoints } from "../../../../hooks";
import {
  DashboardNavLogo as Logo,
  DashboardNavItems as Items,
  DashboardNavProfile as Profile,
} from ".";

export const DashboardNav = () => {
  return (
    <Container>
      <div className="mx-auto">
        <Logo />
      </div>
      <Items />
      <div className="absolute left-0 right-0 bottom-12 md:mx-auto md:w-[200px]">
        <Profile />
      </div>
    </Container>
  );
};

const Container = ({ children }) => {
  const { isSm, isXs } = useBreakpoints();

  return (
    <div
      className="
      fixed flex h-screen w-[60px] flex-col overflow-hidden bg-white py-12 px-3 drop-shadow-md md:w-[250px]">
      {children}
    </div>
  );
};

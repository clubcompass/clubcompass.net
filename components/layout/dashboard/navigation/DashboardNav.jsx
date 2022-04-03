import React, { useEffect } from "react";
import {
  DashboardNavLogo as Logo,
  DashboardNavItems as Items,
  DashboardNavProfile as Profile,
} from ".";

export const DashboardNav = () => {
  return (
    <Container>
      <Logo />
      <Items />
      <Profile />
    </Container>
  );
};

const Container = ({ children }) => {
  return (
    <div
      className="
      fixed z-50 flex h-screen w-[60px] flex-col items-center justify-between border-r bg-white py-12 md:w-[100px]">
      {children}
    </div>
  );
};

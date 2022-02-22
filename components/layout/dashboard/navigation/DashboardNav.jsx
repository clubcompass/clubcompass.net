import React from "react";
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

const Container = ({ children }) => (
  <div className="fixed h-screen w-[343px] py-6 px-3 flex flex-col justify-between items-start bg-gray-200">
    {children}
  </div>
);

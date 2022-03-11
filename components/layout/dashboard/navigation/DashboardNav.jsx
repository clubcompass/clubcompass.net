import React from "react";
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
      <div className="absolute left-0 right-0 mx-auto w-[200px] bottom-12">
        <Profile />
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="fixed h-screen w-[250px] py-12 px-3 flex flex-col bg-white">
    {children}
  </div>
);

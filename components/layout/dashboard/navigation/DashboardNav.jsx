import React, { useEffect } from "react";
import { useRouter } from "next/router";
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
      <div className="absolute left-0 right-0 bottom-12 mx-auto w-[200px]">
        <Profile />
      </div>
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="fixed flex h-screen w-[250px] flex-col bg-white py-12 px-3">
    {children}
  </div>
);

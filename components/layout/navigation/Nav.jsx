import React from "react";
import { useLayoutContext } from "../../../context";
import { useBreakpoints } from "../../../hooks";
import { NavItems, NavLogo, NavLogin, NavProfile, NavHamburger } from ".";

export const Nav = () => {
  const { user } = useLayoutContext();
  const { isMd, isSm, isXs } = useBreakpoints();
  const isMobile = isMd || isSm || isXs;
  return (
    <Container>
      {isMobile && <NavHamburger />}
      <NavLogo />
      <NavItems />
      {user === null ? <NavLogin /> : <NavProfile name={user.name} />}
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="flex flex-row px-6 lg:px-16 py-6 lg:py-10 justify-between items-center w-screen z-50">
    {children}
  </div>
);

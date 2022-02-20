import React from "react";
import { useRouter } from "next/router";
import { LayoutProvider, useLayoutContext } from "../../context";
import { Nav, Footer } from ".";
export const Layout = ({ children }) => {
  const blacklist = ["/register", "/login", "/account/recovery"];
  const router = useRouter();
  return (
    <LayoutProvider>
      <LayoutContainer router={router}>
        {!blacklist.includes(router.pathname) && <Nav />}
        {!blacklist.includes(router.pathname) ? (
          <div className="px-6 lg:px-16">{children}</div>
        ) : (
          <div>{children}</div>
        )}
        {router.pathname === "/" && <Footer />}
      </LayoutContainer>
    </LayoutProvider>
  );
};

const LayoutContainer = ({ children, router }) => {
  const { menuOpen } = useLayoutContext();
  return (
    <div
      className={`${
        router.pathname === "/register" || router.pathname === "/login"
          ? ""
          : "flex flex-col justify-between"
      } ${menuOpen && "fixed h-full overflow-hidden"}`}
    >
      {children}
    </div>
  );
};

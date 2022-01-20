import React from "react";
import { Nav, Footer } from ".";
import { useRouter } from "next/router";
export const Layout = ({ children }) => {
  const router = useRouter();
  // w-[100vw] h-[100vh]
  return (
    <div
      className={`${
        router.pathname === "/register" || router.pathname === "/login"
          ? ""
          : "flex flex-col justify-between bg-[#FCFEFF]"
      }`}
    >
      <Nav />
      <div className="px-6 lg:px-16">{children}</div>
      {router.pathname === "/" && <Footer />}
    </div>
  );
};

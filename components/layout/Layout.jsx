import React from "react";
import { Navigation, Footer } from ".";
import { useRouter } from "next/router";
export const Layout = ({ children }) => {
  const router = useRouter();
  // w-[100vw] h-[100vh]
  return (
    <div
      className={`${
        router.pathname === "/register" || router.pathname === "/login"
          ? ""
          : "flex flex-col justify-between bg-[#FCFEFF] p-8"
      }`}
    >
      {router.pathname === "/" && <Navigation />}
      <div>{children}</div>
      {router.pathname === "/" && <Footer />}
    </div>
  );
};

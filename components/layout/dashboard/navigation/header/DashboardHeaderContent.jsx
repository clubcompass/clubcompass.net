import React from "react";
import { useAuthContext } from "../../../../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import { useBreakpoints } from "../../../../../hooks";

export const DashboardHeaderContent = () => {
  const router = useRouter();

  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  return (
    <Container>
      <PageTitle />
      {!isMobile && <PageMessage />}
      {!router.pathname.includes("admin") &&
      !router.pathname.includes("new") ? (
        <PageButton />
      ) : (
        <span className="h-[32px] w-[65px]"></span>
      )}
    </Container>
  );
};

const Container = ({ children }) => {
  return (
    <div className="flex items-center justify-between pr-[20px] md:pr-[40px]">
      {children}
    </div>
  );
};

const PageTitle = () => {
  const router = useRouter();

  return (
    <h1 className="text-lg font-semibold md:text-xl">
      {router.pathname === "/dashboard" && "Club Dashboard"}
      {router.pathname === "/dashboard/manage" && "Mange Clubs"}
      {router.pathname === "/dashboard/activity" && "Notifications"}
      {router.pathname === "/dashboard/account" && "Manage Account"}
      {router.pathname === "/dashboard/new" && "New Club"}
      {router.pathname === "/admin/accounts" && "Manage Accounts"}
      {router.pathname === "/admin/accounts/manage" && "Manage Accounts"}
      {router.pathname === "/admin" && "Manage Clubs"}
      {router.pathname === "/admin/manage" && "Manage Clubs"}
    </h1>
  );
};

const PageMessage = () => {
  const router = useRouter();

  const { user } = useAuthContext();
  const name = `${user?.firstname} ${user?.lastname}`;

  return (
    <div className="whitespace-nowrap">
      {router.pathname === "/dashboard" && `Welcome back, ${name}`}
      {router.pathname === "/dashboard/activity" &&
        `These are your pending and outgoing club invites`}
      {router.pathname === "/dashboard/new" &&
        `You are currently creating a club`}
    </div>
  );
};

const PageButton = () => {
  const router = useRouter();

  return (
    <Link href="/dashboard/new">
      <a className="whitespace-nowrap rounded-md bg-gradient-to-tl from-cc to-[#3771FA] px-3 py-1 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-gradient-to-br md:px-6">
        New Club
      </a>
    </Link>
  );
};

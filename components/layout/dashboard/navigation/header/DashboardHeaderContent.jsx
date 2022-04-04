import React from "react";
import { useAuthContext } from "../../../../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import { useBreakpoints } from "../../../../../hooks";

export const DashboardHeaderContent = () => {
  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  return (
    <Container>
      <PageTitle />
      {!isMobile && <PageMessage />}
      <PageButton />
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
    </h1>
  );
};

const PageMessage = () => {
  const router = useRouter();

  const { user } = useAuthContext();
  const name = `${user?.firstname} ${user?.lastname}`;

  const count = 7;

  return (
    <div className="whitespace-nowrap">
      {router.pathname === "/dashboard" && `Welcome back, ${name}`}
      {router.pathname === "/dashboard/manage" &&
        `You have ${count} active drafts`}
      {router.pathname === "/dashboard/activity" &&
        `You have ${count} pending invites and ${count} outgoing invites`}
      {router.pathname === "/dashboard/new" && `5 out of 12 steps completed`}
    </div>
  );
};

const PageButton = () => {
  const router = useRouter();

  return router.pathname === "/dashboard/manage/club/new" ? (
    <Link href="/poo">
      <a className="whitespace-nowrap rounded-lg bg-gray-200 px-3 py-1 text-black md:px-6">
        Save Draft
      </a>
    </Link>
  ) : (
    <Link href="/dashboard/new">
      <a className="whitespace-nowrap rounded-md bg-gradient-to-tl from-cc to-[#3771FA] px-3 py-1 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-gradient-to-br md:px-6">
        New Club
      </a>
    </Link>
  );
};

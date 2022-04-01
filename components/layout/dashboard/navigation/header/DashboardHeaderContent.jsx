import React from "react";
import { useAuthContext } from "../../../../../context";
import { useRouter } from "next/router";
import Link from "next/link";

export const DashboardHeaderContent = () => {
  return (
    <Container>
      <PageTitle />
      <PageMessage />
      <PageButton />
    </Container>
  );
};

const Container = ({ children }) => {
  return (
    <div className="flex items-center justify-between pr-[40px]">
      {children}
    </div>
  );
};

const PageTitle = () => {
  const router = useRouter();

  return (
    <h1 className="text-xl font-semibold">
      {router.pathname === "/dashboard" && "Club Dashboard"}
      {router.pathname === "/dashboard/manage" && "Mange Clubs"}
      {router.pathname === "/dashboard/activity" && "Notifications"}
      {router.pathname === "/dashboard/account" && "Manage Account"}
      {router.pathname === "/dashboard/manage/club/new" && "New Club"}
    </h1>
  );
};

const PageMessage = () => {
  const router = useRouter();

  const { user } = useAuthContext();
  const name = `${user?.firstname} ${user?.lastname}`;

  const count = 7;

  return (
    <div>
      {router.pathname === "/dashboard" && `Welcome back, ${name}`}
      {router.pathname === "/dashboard/manage" &&
        `You have ${count} active drafts`}
      {router.pathname === "/dashboard/activity" &&
        `You have ${count} pending invites and ${count} outgoing invites`}
    </div>
  );
};

const PageButton = () => {
  const router = useRouter();

  return router.pathname === "/dashboard/manage/club/new" ? (
    <Link href="/poo">
      <a className="rounded-lg bg-gray-200 px-6 py-1 text-black">Save Draft</a>
    </Link>
  ) : (
    <Link href="/dashboard/manage/club/new">
      <a className="rounded-md bg-gradient-to-tl from-cc to-[#3771FA] px-6 py-1 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-gradient-to-br">
        New Club
      </a>
    </Link>
  );
};

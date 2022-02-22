import Link from "next/link";
import React from "react";
import { DashboardOwnerOfClubs as OwnerOfClubs } from "../../components/pages/dashboard/manage";

const Manage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Manage Clubs</h1>
      <Link href="/dashboard/new">
        <a className="text-cc px-2 py-1 bg-cc/10">Create Club</a>
      </Link>
      <OwnerOfClubs />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      dashboardLayout: true,
    },
  };
};

export default Manage;

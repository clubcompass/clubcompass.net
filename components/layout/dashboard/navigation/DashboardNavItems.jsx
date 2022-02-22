import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
export const DashboardNavItems = () => {
  const { user } = useAuthContext();
  console.log(user);

  const roleSpecificItems = {
    // replace icon with react icon component
    STUDENT: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: "home",
      },
      {
        label: "Manage Clubs",
        to: "/dashboard/manage",
        icon: "manage",
      },
      {
        label: "Activity",
        to: "/dashboard/activity",
        icon: "activity",
      },
      {
        label: "Settings",
        to: "/dashboard/account",
        icon: "settings",
      },
    ],
    ADMIN: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: "home",
      },
      {
        label: "Manage Clubs",
        to: "/dashboard/manage",
        icon: "manage",
      },
      {
        label: "Settings",
        to: "/dashboard/account",
        icon: "settings",
      },
    ],
    TEACHER: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: "home",
      },
      {
        label: "Settings",
        to: "/dashboard/account",
        icon: "settings",
      },
    ],
  };

  return (
    <div>
      {roleSpecificItems[user.type].map((item, i) => (
        <DashboardItem key={i} {...item} />
      ))}
    </div>
  );
};

const DashboardItem = ({ label, to, icon }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {/* <div className="text-lg text-cc">{icon}</div> */}
      <Link href={to}>
        <a className="text-cc underline">{label}</a>
      </Link>
    </div>
  );
};

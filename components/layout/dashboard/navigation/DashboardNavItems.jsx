import React from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
import { useRouter } from "next/router";

import { DashboardIcon } from "../../../custom/DashboardIcon";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { RiSettings5Line } from "react-icons/ri";

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
    <div className="mt-16">
      {roleSpecificItems[user.type].map((item, i) => (
        <DashboardItem key={i} {...item} />
      ))}
    </div>
  );
};

const DashboardItem = ({ label, to, icon }) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  const notifications = "12";

  return (
    <Link href={to}>
      <a
        className={`flex flex-row items-center mb-6 py-2 px-4 mx-6 rounded-md gap-4 ${
          isActive ? "text-cc bg-[#1C5EF915]" : "text-[#787F92]"
        }`}
      >
        <Icon icon={icon} color={isActive ? "#1C5EF9" : "#787F92"} />
        <a className="">{label}</a>
        {icon == "activity" && (
          <div className="flex w-[23px] h-[23px] bg-[#FCD7D5] items-center justify-center rounded-full">
            <a className="text-xs font-semibold text-[#F27875]">
              {notifications}
            </a>
          </div>
        )}
      </a>
    </Link>
  );
};

const Icon = ({ icon, color }) => {
  return (
    <div className="text-xl">
      {icon == "home" && <DashboardIcon color={color} />}
      {icon == "manage" && <HiOutlinePencilAlt />}
      {icon == "activity" && <BiBell />}
      {icon == "settings" && <RiSettings5Line />}
    </div>
  );
};

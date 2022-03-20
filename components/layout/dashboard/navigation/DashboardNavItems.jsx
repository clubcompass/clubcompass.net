import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "../../../../context";
import { useRouter } from "next/router";

import { DashboardIcon } from "../../../custom/DashboardIcon";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { RiSettings5Line } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";

export const DashboardNavItems = () => {
  const { user } = useAuthContext();
  const pending = user.invites.filter((invite) => invite.status === "PENDING");

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
        label: "Edit Profile",
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
        label: "Edit Profile",
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
        label: "Edit Profile",
        to: "/dashboard/account",
        icon: "settings",
      },
    ],
    ASB: [
      {
        label: "Clubs",
        to: "/admin",
        icon: "home",
      },
      {
        label: "Accounts",
        to: "/admin/accounts",
        icon: "accounts",
      },
    ],
  };

  return (
    <div className="mt-16 flex flex-col gap-2">
      {roleSpecificItems[user.type].map((item, i) => (
        <DashboardItem key={i} {...item} notifications={pending.length} />
      ))}
    </div>
  );
};

const DashboardItem = ({ label, to, icon, notifications }) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <Link href={to}>
      <a
        className={`mx-6 mb-6 flex flex-row items-center gap-4 rounded-md py-2 px-4 ${
          isActive
            ? "bg-[#1C5EF915] text-cc"
            : "text-[#787F92] hover:bg-[#FAFAFA]"
        } `}>
        <Icon icon={icon} color={isActive ? "#1C5EF9" : "#787F92"} />
        <span>{label}</span>
        {icon === "activity" && (
          <div className="-ml-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red-400">
            <span className="text-[10px] font-semibold text-white">
              {notifications}
            </span>
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
      {icon == "accounts" && <BsPeopleFill />}
    </div>
  );
};

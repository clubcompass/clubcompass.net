import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiSettings5Line } from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { useAuthContext } from "../../../../context";
import { DashboardIcon } from "../../../custom/DashboardIcon";
import { Loading } from "../../../general/Loading";
import { useBreakpoints } from "../../../../hooks";

export const DashboardNavItems = () => {
  const { user } = useAuthContext(); //! should have loading state

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
        disabled: !user?.emailVerified || !user?.active,
      },
      {
        label: "Activity",
        to: "/dashboard/activity",
        icon: "activity",
        disabled: !user?.emailVerified || !user?.active,
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
    <div className="mt-16">
      {roleSpecificItems[user.type].map((item, i) => (
        <DashboardItem key={i} {...item} notifications={user?.pendingInvites} />
      ))}
    </div>
  );
};

const DashboardItem = ({ label, to, icon, notifications, disabled }) => {
  const router = useRouter();
  const isActive = router.pathname === to;

  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  return (
    <Link href={to}>
      <a
        className={`
        mb-6 flex flex-row items-center justify-center gap-4 rounded-md py-[0.57rem] md:mx-6 md:justify-start md:py-2 md:px-4 ${
          isActive
            ? "bg-[#1C5EF915] text-cc"
            : disabled
            ? "pointer-events-none cursor-not-allowed text-gray-200"
            : "text-[#787F92] hover:bg-[#FAFAFA]"
        } `}
      >
        <Icon icon={icon} color={isActive ? "#1C5EF9" : "#787F92"} />
        {!isMobile && (
          <div className="flex items-center gap-4">
            <span>{label}</span>
            {icon === "activity" && !disabled && notifications !== 0 && (
              <div className="-ml-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red-400">
                <span className="text-[10px] font-semibold text-white">
                  {notifications}
                </span>
              </div>
            )}
          </div>
        )}
      </a>
    </Link>
  );
};

const Icon = ({ icon, color }) => {
  return (
    <div className="text-xl">
      {icon === "home" && <DashboardIcon color={color} />}
      {icon === "manage" && <HiOutlinePencilAlt />}
      {icon === "activity" && <BiBell />}
      {icon === "settings" && <RiSettings5Line />}
      {icon === "accounts" && <BsPeopleFill />}
    </div>
  );
};

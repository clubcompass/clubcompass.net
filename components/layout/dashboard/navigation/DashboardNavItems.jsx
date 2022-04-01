import React, { useEffect, useState } from "react";
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
  const [hover, setHover] = useState(false);

  const router = useRouter();
  const isActive = router.pathname === to;

  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  const showTip = () => {
    setHover(!hover);
  };

  return (
    <Link href={to}>
      <a
        className={`
          flex flex-row items-center justify-center rounded-md py-[0.57rem] md:py-2 ${
            isActive
              ? "border-cc text-cc"
              : disabled
              ? "pointer-events-none cursor-not-allowed text-gray-200"
              : "text-[#787F92]"
          } `}>
        {isActive && !isMobile && (
          <span className="absolute h-[20px] w-[5px] -translate-x-6 rounded-lg bg-cc" />
        )}
        <div className="flex" onMouseEnter={showTip} onMouseLeave={showTip}>
          <Icon
            icon={icon}
            isActive={isActive}
            color={isActive ? "#1C5EF9" : "#787F92"}
          />
          {hover && <Label label={label} />}
        </div>
        {/* {!isMobile && (
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
            )} */}
      </a>
    </Link>
  );
};

const Icon = ({ icon, color, isActive }) => {
  return (
    <div
      className={`${
        !isActive && "hover:bg-gray-100"
      } rounded-md p-[.3rem] text-xl`}>
      {icon === "home" && <DashboardIcon color={color} />}
      {icon === "manage" && <HiOutlinePencilAlt />}
      {icon === "activity" && <BiBell />}
      {icon === "settings" && <RiSettings5Line />}
      {icon === "accounts" && <BsPeopleFill />}
    </div>
  );
};

const Label = ({ label }) => {
  return (
    <div className="relative">
      <div className="absolute ml-2 flex items-center">
        <span className="h-0 w-0 border-t-4 border-b-4 border-r-4 border-b-transparent border-r-black border-t-transparent" />
        <p className="whitespace-nowrap rounded-md bg-black px-4 text-white">
          {label}
        </p>
      </div>
    </div>
  );
};

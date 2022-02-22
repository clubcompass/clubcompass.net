import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuthContext } from "../../../../context";
export const DashboardNavProfile = () => {
  const {
    user: { firstname, lastname },
    logout,
  } = useAuthContext();

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-xs">
        {firstname} {lastname}
      </div>
      <HiOutlineLogout
        className="text-red-500 cursor-pointer"
        onClick={logout}
      />
    </div>
  );
};

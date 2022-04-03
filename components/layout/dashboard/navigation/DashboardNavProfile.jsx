import React from "react";
import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
import { useBreakpoints } from "../../../../hooks";

export const DashboardNavProfile = () => {
  const { loading, user, logout } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
      {user ? (
        <>
          <div
            onClick={logout}
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md">
            <HiOutlineLogout className="text-xl text-[#FF5C5C]" />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

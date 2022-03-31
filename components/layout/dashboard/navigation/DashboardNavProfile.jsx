import React from "react";
import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";
import { useBreakpoints } from "../../../../hooks";

export const DashboardNavProfile = () => {
  const { loading, user, logout } = useAuthContext();

  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  // if (!user && loading) return <Loading />;

  const name = `${user?.firstname} ${user?.lastname.charAt(0)}.`;
  const initials = (
    name.split(" ").shift().charAt(0) + name.split(" ").pop().charAt(0)
  ).toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
      {user ? (
        <>
          {!isMobile && (
            <Link href="/dashboard/account">
              <a className="inline-flex items-center rounded-md bg-ccGrey text-sm font-medium text-black hover:bg-ccGreyDark md:w-full">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#AFC7FF] text-center">
                  <p className="w-[40px] text-[0.9rem] font-semibold">
                    {initials}
                  </p>
                </div>
                {!isMobile && (
                  <div className="max-w-[138px] truncate px-3 font-semibold tracking-wide">
                    {name}
                  </div>
                )}
              </a>
            </Link>
          )}
          <div
            onClick={logout}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-[#FF5C5C10] md:px-2"
          >
            <HiOutlineLogout className="text-lg text-[#FF5C5C]" />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

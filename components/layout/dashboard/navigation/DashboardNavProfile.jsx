import React from "react";
import Link from "next/link";
import { HiOutlineLogout } from "react-icons/hi";
import { Loading } from "../../../general/Loading";
import { useAuthContext } from "../../../../context";

export const DashboardNavProfile = () => {
  const { loading, user, logout } = useAuthContext();

  if (!user && loading) return <Loading />;

  const name = `${user?.firstname} ${user?.lastname}`;
  const initials = (
    name.split(" ").shift().charAt(0) + name.split(" ").pop().charAt(0)
  ).toUpperCase();

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      {user ? (
        <>
          <Link href="/dashboard/account">
            <a className="bg-ccGrey hover:bg-ccGreyDark text-sm font-medium text-black inline-flex w-full rounded-md items-center">
              <div className="flex h-10 justify-center text-center items-center rounded-md bg-[#AFC7FF]">
                <p className={`text-[1.1rem] w-[40px]`}>{initials}</p>
              </div>
              <div className="px-3 max-w-[138px] font-semibold tracking-wide truncate">
                {name}
              </div>
            </a>
          </Link>
          <div
            onClick={logout}
            className="flex items-center justify-center cursor-pointer rounded-md px-2 h-[40px] bg-[#FF5C5C10]"
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

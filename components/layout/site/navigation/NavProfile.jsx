import React, { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useLayoutContext, useAuthContext } from "../../../../context";

export const NavProfile = ({ name }) => {
  const { menuOpen } = useLayoutContext();
  const { logout } = useAuthContext();
  const initials = (
    name.split(" ").shift().charAt(0) + name.split(" ").pop().charAt(0)
  ).toUpperCase();
  return (
    <div className="">
      <Menu as="div" className="lg:w-[200px] relative inline-block">
        <div>
          <Menu.Button className="bg-ccGrey hover:bg-ccGreyDark text-sm font-medium text-black inline-flex w-full rounded-md items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div
              className={`flex w-[35px] h-[35px] justify-center items-center rounded-md ${
                menuOpen ? "bg-[#5794FF]" : "bg-[#AFC7FF]"
              }`}
            >
              <p className={`text-sm   ${menuOpen && "text-white"}`}>
                {initials}
              </p>
            </div>
            <div className="hidden lg:flex pl-1 text-sm tracking-wide truncate">
              {name}
            </div>
            <div className="hidden lg:flex pr-3">
              <FaChevronDown />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute w-[150px] lg:w-full right-0 mt-2 origin-top-right divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              menuOpen
                ? "bg-[#5794FF] divide-white divide-opacity-25"
                : "bg-white divide-gray-100"
            }`}
          >
            <div className="px-1 py-1">
              <Menu.Item>
                <Link href="/dashboard/account">
                  <a
                    className={`${
                      menuOpen ? "text-white bg-white/5" : "text-gray-500"
                    } hover:bg-ccGreyDark group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm hover:text-black`}
                  >
                    <FiSettings />
                    Edit profile
                  </a>
                </Link>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <div
                  onClick={logout}
                  className="bg-red-500 text-white lg:bg-white lg:text-red-500 lg:hover:bg-red-500 hover:text-white group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer"
                >
                  <MdLogout />
                  Log out
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

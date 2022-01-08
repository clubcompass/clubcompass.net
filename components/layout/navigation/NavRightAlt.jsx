import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

export const NavRightAlt = ({ name, profileColor }) => {
  const fullName = name.split(" ");
  const initials = (
    fullName.shift().charAt(0) + fullName.pop().charAt(0)
  ).toUpperCase();
  return (
    <div className="">
      <Menu as="div" className="w-[219px] relative inline-block">
        <div>
          <Menu.Button className="bg-ccGrey hover:bg-ccGreyDark text-sm font-medium text-black inline-flex w-full rounded-md items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div
              style={{ backgroundColor: profileColor }}
              className="flex w-[40px] h-[40px] justify-center items-center rounded-md"
            >
              <p>{initials}</p>
            </div>
            <div className="font-normal">{name}</div>
            <div className="pr-3">
              <BsChevronDown />
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
          <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-ccGreyDark" : ""
                    } group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm text-[#919191]`}
                  >
                    <FiSettings />
                    Edit profile
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-[#E86464] text-white" : "text-[#E86464]"
                    } group flex gap-2 rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <MdLogout />
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

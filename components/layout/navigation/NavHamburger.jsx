import Link from "next/link";

import { HiOutlineMenu } from "react-icons/hi";

export const NavHamburger = () => {
  return (
    <div className="flex lg:hidden items-center">
      <button className="cursor-pointer">
        <HiOutlineMenu className="text-3xl" />
      </button>
    </div>
  );
};

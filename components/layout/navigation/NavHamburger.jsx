import { useState } from "react";

import { NavMenu } from "./NavMenu";

import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export const CloseMenu = () => {
  setOpen(false);
};

export const NavHamburger = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex lg:hidden items-center">
      <button className="cursor-pointer z-10">
        {open ? (
          <IoMdClose
            onClick={() => setOpen(!open)}
            className="w-[30px] h-[30px]"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setOpen(!open)}
            className="w-[30px] h-[30px]"
          />
        )}
      </button>
      {open ? <NavMenu /> : ""}
    </div>
  );
};

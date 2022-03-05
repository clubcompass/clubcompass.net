import React from "react";
import Link from "next/link";
import { useLayoutContext } from "../../../../context";
import { CCIcon } from "../../../custom";

export const NavLogo = () => {
  const { menuOpen, setMenuState } = useLayoutContext();
  return (
    <Link href="/">
      <a
        onClick={menuOpen ? () => setMenuState(false) : null}
        className="flex items-center"
      >
        <div className="md:mr-4 md:w-5 w-7 z-50">
          <CCIcon color={`${menuOpen ? "#fff" : "cc"}`} />
        </div>
        <span
          className={`hidden md:flex z-10 text-lg tracking-wider font-semibold ${
            menuOpen && "text-white"
          }`}
        >
          Club Compass
        </span>
      </a>
    </Link>
  );
};

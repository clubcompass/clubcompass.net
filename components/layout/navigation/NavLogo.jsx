import React from "react";
import Link from "next/link";
import { useLayoutContext } from "../../../context";
import { CCIcon } from "../../custom";

export const NavLogo = () => {
  const { menuOpen, setMenuState } = useLayoutContext();
  return (
    <Link href="/">
      <a
        onClick={menuOpen ? () => setMenuState(false) : null}
        className="flex items-center"
      >
        <div className="md:mr-4 w-[40px] h-[40px] z-50">
          <CCIcon color={`${menuOpen ? "#fff" : "cc"}`} />
        </div>
        <h1
          className={`hidden md:flex z-10 text-2xl tracking-wider font-bold ${
            menuOpen && "text-white"
          }`}
        >
          Club Compass
        </h1>
      </a>
    </Link>
  );
};

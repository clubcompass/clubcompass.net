import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLayoutContext } from "../../../../context";
import { useBreakpoints } from "../../../../hooks";

export const NavLink = ({ target, name, icon }) => {
  const router = useRouter();
  const { isMd, isSm, isXs } = useBreakpoints();
  const { setMenuState } = useLayoutContext();
  const isActive = router.pathname === target;
  const isMobile = isMd || isSm || isXs;

  const navStyle = [
    isActive
      ? "text-white/40 lg:bg-cc lg:hover:bg-ccDark lg:text-white lg:border-b-0"
      : "text-white lg:bg-ccGrey lg:hover:bg-ccGreyDark lg:text-black",
    isMobile
      ? `first:mt-8 flex items-center ml-6 mr-6 pl-7 py-2 text-[32px] font-semibold`
      : `flex items-center gap-2 px-3 py-1 rounded-md`,
  ];

  return (
    <Link href={target}>
      <a
        onClick={isMobile ? () => setMenuState(false) : null}
        className={navStyle.join(" ")}
      >
        {!isMobile && icon}
        {name}
      </a>
    </Link>
  );
};

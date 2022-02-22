import React from "react";
import Link from "next/link";
import { useLayoutContext } from "../../../../context";
import { useBreakpoints } from "../../../../hooks";
import { BsFillPersonFill } from "react-icons/bs";
export const NavLogin = () => {
  const { isMd, isSm, isXs } = useBreakpoints();

  if (isSm || isXs) {
    return <MobileLogin />;
  }
  return <DesktopLogin register={!isMd} />;
};

const DesktopLogin = ({ register }) => {
  const { menuOpen, setMenuState } = useLayoutContext();
  const button =
    "z-10 px-7 py-[.3rem] text-sm rounded-lg border-2 font-semibold border-cc items-center justify-center";
  return (
    <div className="flex gap-4 items-center">
      {register && (
        <Link href="/register">
          <a className={`${button} hover:bg-[#EAF0FF] text-cc`}>Register</a>
        </Link>
      )}

      <Link href="/login">
        <a
          onClick={() => setMenuState(false)}
          className={`${button} ${
            menuOpen ? "bg-ccDark" : "bg-cc"
          }  bg-cc hover:bg-ccDark hover:border-ccDark text-white`}
        >
          Login
        </a>
      </Link>
    </div>
  );
};

const MobileLogin = () => {
  const { menuOpen } = useLayoutContext();
  return (
    <Link href="/login">
      <a
        className={`z-10 flex w-10 h-10 justify-center items-center rounded-md ${
          menuOpen ? "bg-[#5794FF]/50" : "bg-gray-100"
        }`}
      >
        <BsFillPersonFill
          className={`text-xl ${menuOpen && "text-white/80"}`}
        />
      </a>
    </Link>
  );
};

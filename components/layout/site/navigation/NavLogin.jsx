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
  return (
    <div className="flex gap-2 items-center">
      <Link href="/login">
        <a
          onClick={() => setMenuState(false)}
          className={`z-10 px-4 py-1.5 text-sm rounded-md font-semibold border-cc items-center justify-center ${
            menuOpen ? "bg-ccDark text-white" : "bg-cc text-gray-600"
          }  bg-transparent hover:bg-gray-100 `}
        >
          Login
        </a>
      </Link>

      {register && (
        <Link href="/register">
          <a className="z-10 px-4 py-1.5 text-sm rounded-md font-semibold items-center justify-center text-white bg-gradient-to-tl hover:bg-gradient-to-br hover:scale-105 from-cc to-[#3771FA]  transition duration-200 ease-in-out">
            Signup
          </a>
        </Link>
      )}
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

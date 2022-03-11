import { useState } from "react";
import { animated, useSpring } from "react-spring";
import Link from "next/link";
import { useLayoutContext } from "../../../../context";
import { useBreakpoints } from "../../../../hooks";

export const NavLink = ({ target, name, isActive }) => {
  const { isMd, isSm, isXs } = useBreakpoints();
  const { setMenuState } = useLayoutContext();
  const [isHovered, setHovered] = useState(false);
  const isMobile = isMd || isSm || isXs;

  const navStyle = [
    isActive
      ? "lg:text-cc text-white/20 font-semibold"
      : "text-white lg:text-black",
    isMobile
      ? `first:mt-8 flex items-center ml-6 mr-6 pl-7 py-2 text-[32px] font-semibold`
      : `relative text-sm mx-2 rounded-md`,
  ];

  const spring = useSpring({
    transform: isHovered ? "translateY(0px)" : "translateY(2px)",
    opacity: isHovered ? 1 : 0.5,
  });

  const grow = useSpring({
    width: isActive ? "20px" : "0px",
  });

  return (
    <Link href={target}>
      <a
        onClick={isMobile ? () => setMenuState(false) : null}
        className={navStyle.join(" ")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {name}
        {isHovered && (
          <animated.span
            style={spring}
            className="absolute left-0 -bottom-1 h-[3px] w-5 bg-cc-light rounded-[1px]"
          />
        )}
        {!isMobile && (
          <animated.span
            style={grow}
            className="absolute left-0 -bottom-1 h-[3px] bg-cc rounded-[1px]"
          />
        )}
      </a>
    </Link>
  );
};

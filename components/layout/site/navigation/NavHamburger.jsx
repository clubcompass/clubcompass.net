import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useLayoutContext } from "../../../../context";
import { NavMenu } from ".";

export const NavHamburger = () => {
  const { menuOpen: open, setMenuState: setOpen } = useLayoutContext();

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <div className="flex items-center">
      <button className="cursor-pointer z-10">
        <Burger
          isOpen={open}
          toggle={() => {
            setOpen(!open);
          }}
        />
      </button>
      {open && <NavMenu />}
    </div>
  );
};

const Burger = ({ isOpen, toggle }) => {
  const first = useSpring({
    transform: isOpen
      ? "translate(7px, 25px) rotate(-45deg)"
      : "translate(2px, 7px) rotate(0deg)",
  });
  const second = useSpring({
    transform: isOpen
      ? "translate(10px, 4px) rotate(45deg)"
      : "translate(2px, 19px) rotate(0deg)",
  });
  const third = useSpring({
    transform: isOpen
      ? "translate(7px, 25px) rotate(-45deg)"
      : "translate(2px, 31px) rotate(0deg)",
  });

  return (
    <svg
      onClick={toggle}
      width="30"
      height="30"
      viewBox="0 0 44 44"
      fill={isOpen ? "white" : "black"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <animated.rect width="30" height="3.5" rx="2" style={first} />
      <animated.rect width="30" height="3.5" rx="2" style={second} />
      <animated.rect width="30" height="3.5" rx="2" style={third} />
    </svg>
  );
};

import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { NavItems } from "./NavItems";
export const NavMenu = () => {
  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: { opacity: 0, transform: "translate(0, -20px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(0px, -20px)" },
  });

  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  return transition(
    (style, item) =>
      item && (
        <animated.div
          style={style}
          className="absolute -ml-6 -top-6 pl-3 w-full h-[150vh] bg-cc lg:bg-white"
        >
          <NavItems mobile />
        </animated.div>
      )
  );
};

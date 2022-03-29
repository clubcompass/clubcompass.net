import React from "react";
import { useTransition, animated, config } from "react-spring";

export const Container = ({ children }) => {
  const visible = true;
  const transition = useTransition(visible, {
    from: { opacity: 0, transform: "translate(30px, 0px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(30px, 0px)" },
    config: config.wobbly,
  });
  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="flex w-[90vw] max-w-full flex-col items-center justify-center gap-6">
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

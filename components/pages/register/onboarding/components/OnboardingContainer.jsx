import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

export const Container = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const transition = useTransition(visible, {
    from: { opacity: 0, transform: "translate(30px, 0px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(30px, 0px)" },
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="w-full flex flex-col items-center justify-center gap-6"
            >
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

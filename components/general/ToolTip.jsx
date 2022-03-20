import React, { useState } from "react";

export const ToolTip = ({ children, delay, content }) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="absolute flex"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}>
      {children}
      {active && (
        <div className="relative ml-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
          {content}
        </div>
      )}
    </div>
  );
};

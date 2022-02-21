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
    <div className="relative" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && (
        <div className="absolute ml-[100%] translate-y-[-100%] translate-x-[10px] bg-black/50 text-white text-sm font-base px-2 py-1 rounded">
          {content}
        </div>
      )}
    </div>
  );
};

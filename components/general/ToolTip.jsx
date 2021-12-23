import React, { useState } from "react";

export const ToolTip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div className="relative" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && (
        <div className="absolute ml-[100%] translate-y-[-100%] translate-x-[10px] bg-black/50 text-white text-sm font-base px-2 py-1 rounded">
          {props.content}
        </div>
      )}
    </div>
  );
};

import React from "react";

export const CardContainer = ({ children }) => {
  const [header, content, footer] = children;
  return (
    <div className="flex w-full flex-col justify-between rounded-xl border-[1px] bg-white p-6 transition duration-300 ease-in-out md:h-[223px]">
      <div>
        {header}
        {content}
      </div>
      {footer}
    </div>
  );
};

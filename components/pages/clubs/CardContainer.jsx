import React from "react";

export const CardContainer = ({ children }) => {
  const [header, content, footer] = children;
  return (
    <div className="h-[223px] w-full flex flex-col justify-between bg-white border-[1px] p-6 mb-2 rounded-xl transition duration-300 ease-in-out">
      <div>
        {header}
        {content}
      </div>
      {footer}
    </div>
  );
};

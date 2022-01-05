import React from "react";

export const CardContainer = ({ children }) => {
  const [header, content, footer] = children;
  return (
    <div className="h-[223px] flex flex-col justify-between bg-white drop-shadow-md hover:drop-shadow-xl p-6 mb-2 rounded-xl w-[440px]  transition duration-300 ease-in-out">
      <div>
        {header}
        {content}
      </div>
      {footer}
    </div>
  );
};

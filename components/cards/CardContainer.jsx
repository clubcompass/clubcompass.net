import React from "react";

export const CardContainer = ({ children }) => {
  return (
    <div className="grid justify-items-center grid-cols-tokens gap-2">
      {children}
    </div>
  );
};

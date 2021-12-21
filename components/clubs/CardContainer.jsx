import React from "react";

export const CardContainer = ({ children }) => {
  return (
    <div className="grid justify-items-center grid-cols-cards gap-2">
      {children}
    </div>
  );
};

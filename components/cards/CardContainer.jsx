import React from "react";

export const CardContainer = ({ children }) => {
  return <div className="grid grid-cols-tokens gap-2">{children}</div>;
};

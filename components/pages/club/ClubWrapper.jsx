import React from "react";

export const ClubWrapper = ({ children }) => {
  return (
    <div className="ml-24 mt-10">
      <div className="w-full">{children}</div>
    </div>
  );
};

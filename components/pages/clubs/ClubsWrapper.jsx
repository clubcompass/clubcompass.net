import React from "react";

export const ClubsWrapper = ({ children }) => {
  return (
    <div className="grid justify-items-center grid-cols-cards gap-6">
      {children}
    </div>
  );
};

import React from "react";

export const ClubsWrapper = ({ children }) => {
  return (
    <div className="grid grid-cols-cards justify-items-center gap-6">
      {children}
    </div>
  );
};

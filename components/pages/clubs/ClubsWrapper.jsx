import React from "react";

const ClubsWrapper = ({ children }) => {
  return (
    <div className="flex flex-col justify-items-center gap-6 md:grid md:grid-cols-cards">
      {children}
    </div>
  );
};

export default ClubsWrapper;

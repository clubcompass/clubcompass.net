import React from "react";

export const RegisterContainer = ({ children }) => {
  return (
    <div className="mb-10 flex h-screen w-screen flex-col items-center justify-center gap-8 md:mb-0">
      {children}
    </div>
  );
};

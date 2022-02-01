import React from "react";

export const RegisterContainer = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      {children}
    </div>
  );
};

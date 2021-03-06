import React from "react";

export const RegisterContainer = ({ children }) => {
  return (
    <div className="my-10 flex h-screen w-screen flex-col items-center justify-center gap-8 md:my-0">
      {children}
    </div>
  );
};

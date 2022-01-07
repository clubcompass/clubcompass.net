import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
};

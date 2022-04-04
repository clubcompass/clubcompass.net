import React from "react";

export const StatusTag = ({ children, colors }) => {
  const { bg, fg } = colors;
  return (
    <span
      style={{ backgroundColor: bg, color: fg }}
      className="inline-flex items-center gap-2 rounded-md px-2 capitalize"
    >
      <span
        style={{ backgroundColor: fg }}
        className="h-1.5 w-1.5 rounded-full"
      />
      {children}
    </span>
  );
};

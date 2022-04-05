import React from "react";

export const CustomTitle = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <h4 className="text-gray-400">{subtitle}</h4>
    </div>
  );
};

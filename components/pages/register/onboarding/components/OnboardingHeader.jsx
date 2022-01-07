import React from "react";

export const Header = ({ title, description }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold text-3xl mb-1">{title}</h1>
      <p className="text-medium text-lg text-[#5D5E5E] max-w-[700px]">
        {description}
      </p>
    </div>
  );
};

import React from "react";

export const Header = ({ title, description }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold text-3xl mb-1">{title}</h1>
      <p className="text-lg text-gray-500 max-w-[600px]">{description}</p>
    </div>
  );
};

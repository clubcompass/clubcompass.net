import React from "react";

export const Header = ({ title, description }) => {
  return (
    <div className="mx-4 flex flex-col gap-1 text-center">
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="text-md max-w-[600px] text-gray-500 md:text-lg">
        {description}
      </p>
    </div>
  );
};

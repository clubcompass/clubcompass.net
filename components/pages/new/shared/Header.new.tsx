import React from "react";

type Props = {
  title: string;
  description: string;
};

export const Header = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

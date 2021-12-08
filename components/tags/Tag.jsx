import React from "react";
import { tagSchema } from ".";
export const Tag = ({ tag }) => {
  const clr = tagSchema[tag];
  return (
    <div
      style={{ backgroundColor: `${clr}20` }}
      className="flex justify-center items-center px-2 py-0.5 rounded-md"
    >
      <span
        style={{ color: clr }}
        className="uppercase font-bold text-[0.5rem]"
      >
        {tag}
      </span>
    </div>
  );
};

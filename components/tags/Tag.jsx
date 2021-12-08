import React from "react";
import { tagSchema } from ".";
export const Tag = ({ tag }) => {
  const clr = tagSchema[tag];
  return (
    <div
      style={{ backgroundColor: `${clr}20` }}
      className="flex justify-center items-center px-2.5 py-[0.05rem] rounded-md"
    >
      <span
        style={{ color: clr }}
        className="uppercase font-extrabold text-[0.7rem]"
      >
        {tag}
      </span>
    </div>
  );
};

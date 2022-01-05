import React from "react";
import { tagSchema } from ".";
export const Tag = ({ tag }) => {
  const clr = tagSchema[tag] === undefined ? "#D0F0FE" : tagSchema[tag].bg;
  return (
    <span
      style={{ backgroundColor: clr }}
      className="flex items-center px-2.5 py-[0.05rem] rounded-sm uppercase font-extrabold text-[0.6rem] text-[#344357]"
    >
      {tag}
    </span>
  );
};

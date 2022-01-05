import React from "react";
import { tagSchema } from ".";
import { Icons } from "../icons";

export const PrimaryTag = ({ primaryTag }) => {
  const { bg, fg } = tagSchema[primaryTag];
  return (
    <div style={{ backgroundColor: bg }} className="p-3 rounded-lg">
      {Icons[primaryTag]({ className: "text-2xl", style: { color: fg } })}
    </div>
  );
};

import React from "react";
import { Tag } from ".";
export const Tags = ({ tags }) => {
  return (
    <div className="grid grid-cols-2 max-h-0 gap-1">
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </div>
  );
};

import React from "react";
import { Tag } from ".";
export const Tags = ({ tags }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag.tag.name} />
      ))}
    </div>
  );
};

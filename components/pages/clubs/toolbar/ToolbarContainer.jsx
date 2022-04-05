import React from "react";

export const ToolbarContainer = ({ children }) => {
  const [sort, filter, search] = children;
  return (
    <div className="flex flex-row items-center w-full justify-between mx-0">
      <div className="flex flex-row items-center gap-3">
        {sort}
        {filter}
      </div>
      <div>{search}</div>
    </div>
  );
};

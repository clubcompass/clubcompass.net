import React from "react";

export const ClubWrapper = ({ children }) => {
  const [header, carousel, content, members, similar] = children;
  return (
    <div className="mx-24 mt-10 flex flex-col gap-12">
      <div className="w-full">{header}</div>
      <div className="flex flex-row gap-4 ">
        {carousel}
        {content}
        {members}
      </div>
      {similar}
    </div>
  );
};

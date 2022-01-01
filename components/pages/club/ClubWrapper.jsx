import React from "react";

export const ClubWrapper = ({ children }) => {
  const [header, carousel, content, members, similar] = children;
  return (
    <div className="mx-24 mt-10 flex flex-col gap-12">
      <div className="w-full">{header}</div>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-3">{carousel}</div>
        <div className="col-span-3">{content}</div>
        <div className="col-span-2">{members}</div>
      </div>
      {similar}
    </div>
  );
};

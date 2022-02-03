import React, { useState } from "react";

export const ClubContent = ({ description }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="pr-[12px]">
        <p>{description}</p>
      </div>
    </div>
  );
};

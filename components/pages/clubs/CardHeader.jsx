import React from "react";
import { Tags } from "../../general/tags";
import { PrimaryTag } from "../../general/tags";
export const CardHeader = ({ name, primaryTag, tags }) => (
  <div className="relative flex flex-row items-center justify-between">
    <div className="flex w-[calc(100%-60px)] flex-col">
      <h3 id={name} className="mb-2 text-[25px] font-bold leading-tight">
        {name}
      </h3>
      <Tags tags={tags} clubs />
    </div>
    <div className="absolute top-0 right-0">
      <PrimaryTag primaryTag={primaryTag} />
    </div>
  </div>
);

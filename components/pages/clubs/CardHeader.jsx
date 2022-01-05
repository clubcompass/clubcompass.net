import React from "react";
import { Tags } from "../../general/tags";
import { PrimaryTag } from "../../general/tags";
export const CardHeader = ({ name, primaryTag, tags }) => (
  <div className="relative flex flex-row justify-between items-center">
    <div className="flex flex-col">
      <h3
        id={name}
        className="font-bold text-[25px] leading-tight mb-2 max-w-[21rem]"
      >
        {name}
      </h3>
      <Tags tags={tags} />
    </div>
    <div className="absolute right-0">
      <PrimaryTag primaryTag={primaryTag} />
    </div>
  </div>
);

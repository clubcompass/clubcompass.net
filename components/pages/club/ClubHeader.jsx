import React from "react";
import { Icons } from "../../general/icons";
import { tagSchema, Tags } from "../../general/tags";
export const ClubHeader = ({ name, tags }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Icon icon={tags[0].name} />
      <div className="ml-4">
        <h1 className="text-center font-bold text-4xl mb-2">{name}</h1>
        <Tags tags={tags} />
      </div>
    </div>
  );
};

const Icon = ({ icon }) => {
  const { bg, fg } = tagSchema[icon];
  return (
    <div style={{ backgroundColor: bg }} className="p-3 m-auto rounded-lg">
      {Icons[icon]({ className: "text-5xl", style: { color: fg } })}
    </div>
  );
};

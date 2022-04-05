import React from "react";
import { StatusTag } from "../../../../general/StatusTag";
import { Tag } from "../../../../general/tags";
import { usePaginationContext } from "./DashboardPaginationProvider";
import { DashboardSummaryEditButton as EditButton } from "./DashboardSummaryEditButton";

export const DashboardSummaryBasic = ({ club }) => {
  const { direct } = usePaginationContext();
  return (
    <div className="flex w-[480px] flex-col gap-4 ">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-semibold">{club.name}</h3>
        <EditButton value={0} />
      </div>
      <div className="grid grid-cols-4 items-center gap-2 border-b pb-4">
        <InfoItem label="Status">
          <StatusTag type={club.status} label={club.status} />
        </InfoItem>
        <InfoItem label={"Email"}>
          <p>{club.email}</p>
        </InfoItem>
        <InfoItem label={"Tags"}>
          <Tags tags={club.tags} />
        </InfoItem>
        <InfoItem label={"Meeting Time"}>
          <p>{club.meetingDate}</p>
        </InfoItem>
        <InfoItem label={"Location"}>
          <p>{club.location}</p>
        </InfoItem>
      </div>
      <div className="border-b pb-4">
        <div className="flex items-center gap-4">
          <h5 className="text-gray-400">Description</h5>
          <EditButton value={0} />
        </div>
        <p className="w-[800px]">{club.description}</p>
      </div>
    </div>
  );
};

const InfoItem = ({ label, children }) => {
  return (
    <>
      <p className="col-span-1 text-gray-400">{label}</p>
      <div className="col-span-3">{children}</div>
    </>
  );
};

const Tags = ({ tags }) => {
  return (
    <div className="flex gap-1">
      {tags.map((tag, i) => (
        <Tag key={i} tag={tag.name} />
      ))}
    </div>
  );
};

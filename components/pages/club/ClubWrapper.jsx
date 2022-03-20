import React from "react";
import { useState } from "react";
import { useBreakpoints } from "../../../hooks";
import { ActionModal } from "../../general/ActionModal";

export const ClubWrapper = ({
  children,
  availability,
  name,
  isMember,
  userId,
  clubId,
  slug,
  draft,
}) => {
  const [header, contact, meeting, content, members, similar] = children;
  const { isMd, isSm, isXs } = useBreakpoints();
  const isMobile = isMd || isSm || isXs;

  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
        <h1 className="mb-8 justify-center md:mb-0">{header}</h1>
        <ActionModal
          name={name}
          isMember={isMember}
          userId={userId}
          clubId={clubId}
          slug={slug}
          availability={availability}
          clubPage
          draft={draft}
        />
      </div>
      <div className="grid-rows grid lg:grid-cols-6 lg:gap-8">
        {isMobile && <Card title="Description">{content}</Card>}
        <div className="order-last lg:order-first lg:col-span-4">
          {!isMobile && <Card title="Description">{content}</Card>}
          {members}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-8 lg:col-span-2 lg:grid-cols-1 lg:gap-0">
          <Card title="Socials">{contact}</Card>
          <Card title="Meetings">{meeting}</Card>
        </div>
      </div>
      {similar}
    </div>
  );
};

export const Card = ({ title, children }) => {
  return (
    <div className="mb-6 rounded-md border-2 border-[#E6E6E6] py-4 px-4 md:py-6 md:px-8">
      <p className="mb-2 text-lg font-bold">{title}</p>
      {children}
    </div>
  );
};

const Button = ({ availability }) => {
  const [joined, setJoined] = useState(false);

  if (availability == "CLOSED") {
    return (
      <button className="h-10 w-48 cursor-default rounded-lg bg-[#E7EEFF] px-8 py-0.5 font-bold text-[#707070]">
        Closed
      </button>
    );
  }

  return (
    <button
      className={`${
        joined ? "bg-[#FF5555]" : "bg-[#1C5EFF]"
      } h-10 w-48 rounded-lg px-8 py-0.5 text-base font-bold text-white`}
      onClick={() => setJoined(!joined)}>
      {joined ? "Leave" : "Join"}
    </button>
  );
};

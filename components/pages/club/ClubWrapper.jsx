import React from "react";
import { useState } from "react";

export const ClubWrapper = ({ children }) => {
  const [header, contact, meeting, content, members, similar] = children;
  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="w-full flex justify-between items-center">
        <h1>{header}</h1>
        <Button />
      </div>
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <Card title="Description">{content}</Card>
          <Card title={`Members (${"number of members"})`}>{members}</Card>
        </div>
        <div className="col-span-2">
          <Card title="Contact Information">{contact}</Card>
          <Card title="Meeting Information">{meeting}</Card>
        </div>
      </div>
      {similar}
    </div>
  );
};

const Card = ({ title, children }) => {
  return (
    <div className="py-6 px-8 mb-6 rounded-md border-2 border-[#E6E6E6]">
      <p className="font-bold text-lg mb-2">{title}</p>
      {children}
    </div>
  );
};

const Button = () => {
  const [joined, setJoined] = useState(false);

  return (
    <button
      className={`${
        joined ? "bg-[#FF5555]" : "bg-[#1C5EFF]"
      } text-base h-10 w-48 font-bold px-8 py-0.5 rounded-lg text-white`}
      onClick={() => setJoined(!joined)}
    >
      {joined ? "Leave" : "Join"}
    </button>
  );
};

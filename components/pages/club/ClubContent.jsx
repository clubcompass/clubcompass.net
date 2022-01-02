import React, { useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
export const ClubContent = ({
  email,
  time,
  location,
  description,
  website,
}) => {
  return (
    <div className="w-full translate-x-[-11px] flex flex-col gap-4">
      <div className="flex flex-col gap-2 font-bold">
        <Info content={email} icon={<MdEmail />} />
        <Info content={time} icon={<AiFillClockCircle />} />
        <Info content={location} icon={<MdLocationOn />} />
      </div>
      <div className="h-[150px] w-full pr-[12px] w-[calc(100%+12px)] overflow-y-scroll">
        <p>{description}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Link {...website} />
        <Button />
      </div>
    </div>
  );
};

const Info = ({ content, icon }) => (
  <div>
    <div className="flex flex-row items-center gap-2">
      <div className="text-lg p-1 text-[#1C5EFF] bg-[#1C5EFF] bg-opacity-10 rounded-md">
        {icon}
      </div>
      <p className="leading-none font-bold text-[#344457] text-lg">{content}</p>
    </div>
  </div>
);

const Button = () => {
  const [joined, setJoined] = useState(false);

  // primary secondary attributes
  return (
    <button
      className={`${
        joined ? "bg-[#FF5555]" : "bg-[#1C5EFF]"
      } text-base font-bold px-8 py-0.5 rounded-lg text-white`}
      onClick={() => setJoined(!joined)}
    >
      {joined ? "Leave" : "Join"}
    </button>
  );
};

const Link = ({ name, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-[#1C5EFF]"
    >
      <div className="relative flex flex-row items-end left-1 group transition duration-200 ease-in-out">
        {name} <BiLinkAlt className="text-xs relative bottom-1.5 left-1" />
        <span className="absolute bg-[#1C5EFF] bg-opacity-10 w-[95%] h-2 group-hover:h-[1.2rem] rounded-sm -left-1 bottom-0.5 transition-height duration-200 ease-in-out" />
      </div>
    </a>
  );
};

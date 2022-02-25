import React from "react";

import { MdLocationOn } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";

export const ClubMeeting = ({ time, location, availability }) => {
  return (
    <div className="flex flex-col gap-2 font-semibold text-[#344457] text-lg">
      <Info icon={<MdLocationOn />}>{location}</Info>
      <Info icon={<AiFillClockCircle />}>{time}</Info>
      <Info icon={<BsFillPeopleFill />}>
        {availability.charAt(0).toUpperCase() +
          availability.slice(1).toLowerCase()}{" "}
        to new members
      </Info>
    </div>
  );
};

const Info = ({ children, icon }) => (
  <div>
    <div className="flex flex-row items-center gap-2">
      <div className="text-lg p-1 text-[#1C5EFF] bg-[#1C5EFF] bg-opacity-10 rounded-md">
        {icon}
      </div>
      <p>{children}</p>
    </div>
  </div>
);

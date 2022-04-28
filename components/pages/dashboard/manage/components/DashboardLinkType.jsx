import React from "react";
import { MdOutlineFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaGlobeAmericas } from "react-icons/fa";
import { RemindIcon } from "../../../../custom/RemindIcon";

const colors = {
  WEBSITE: {
    bg: "#E5E7EB",
    fg: "#4B5463",
  },
  INSTAGRAM: {
    bg: "#F7E3EC",
    fg: "#FE0071",
  },
  TWITTER: {
    bg: "#E5EFF8",
    fg: "#0099F0",
  },
  DISCORD: {
    bg: "#EAEBF7",
    fg: "#4A62F8",
  },
  YOUTUBE: {
    bg: "#FBE4E4",
    fg: "#FF0000",
  },
  FACEBOOK: {
    bg: "#E4EDF6",
    fg: "#0075F4",
  },
  REMIND: {
    bg: "#E7F0F6",
    fg: "#2787DB",
  },
};

export const DashboardLinkType = ({ type }) => {
  return (
    <span
      style={{ color: colors[type].fg, background: colors[type].bg }}
      className="flex items-center gap-2 rounded-md px-3 capitalize">
      <Icon type={type} />
      {type.toLowerCase()}
    </span>
  );
};

const Icon = ({ type }) => {
  if (type === "INSTAGRAM") return <RiInstagramFill />;
  if (type === "TWITTER") return <AiOutlineTwitter />;
  if (type === "DISCORD") return <FaDiscord />;
  if (type === "YOUTUBE") return <AiFillYoutube />;
  if (type === "FACEBOOK") return <MdOutlineFacebook />;
  if (type === "REMIND")
    return (
      <div className="h-[13px] w-[13px]">
        <RemindIcon color={"cc"} />
      </div>
    );

  return <FaGlobeAmericas />;
};

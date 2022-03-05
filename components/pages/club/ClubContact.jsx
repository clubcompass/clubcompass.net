import { CopyText } from "../../general/CopyText";

import { MdEmail, MdOutlineFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaGlobeAmericas } from "react-icons/fa";

export const ClubContact = ({ email, links }) => {
  return (
    <div className="flex flex-col gap-2 font-semibold text-[#344457] text-lg">
      <Info type="EMAIL">
        <CopyText>{email}</CopyText>
      </Info>
      {links.map((link, i) => (
        <Info key={i} type={link.type} link={link.link} target="blank">
          {link.name}
        </Info>
      ))}
    </div>
  );
};

const Info = ({ children, type, link, target }) => (
  <div className="flex flex-row gap-2">
    <a target={target} href={link} className="flex gap-2 items-center">
      <div className="text-lg p-1 text-[#1C5EFF] bg-[#1C5EFF] bg-opacity-10 rounded-md">
        <Icon type={type} />
      </div>
      {children}
    </a>
  </div>
);

const Icon = ({ type }) => {
  if (type === "EMAIL") return <MdEmail />;
  if (type === "INSTAGRAM") return <RiInstagramFill />;
  if (type === "TWITTER") return <AiOutlineTwitter />;
  if (type === "DISCORD") return <FaDiscord />;
  if (type === "YOUTUBE") return <AiFillYoutube />;
  if (type === "FACEBOOK") return <MdOutlineFacebook />;
  return <FaGlobeAmericas />;
};

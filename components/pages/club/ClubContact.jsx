import { CopyText } from "../../general/CopyText";

import { MdEmail, MdOutlineFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaGlobeAmericas } from "react-icons/fa";
import { RemindIcon } from "../../custom/RemindIcon";

export const ClubContact = ({ email, links }) => {
  return (
    <div className="flex flex-col gap-2 text-lg font-semibold text-[#344457]">
      <Info type="EMAIL">
        <CopyText tooltip>{email}</CopyText>
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
    <a target={target} href={link} className="flex items-center gap-2">
      <div className="rounded-md bg-[#1C5EFF10] p-1 text-lg text-[#1C5EFF]">
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
  if (type === "REMIND")
    return (
      <div className="h-[18px] w-[18px]">
        <RemindIcon color={"cc"} />
      </div>
    );

  return <FaGlobeAmericas />;
};

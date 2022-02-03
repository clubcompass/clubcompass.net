import { CopyText } from "../../general/CopyText";

import { MdEmail } from "react-icons/md";
import { HiLink } from "react-icons/hi";
import { RiInstagramFill } from "react-icons/ri";

export const ClubContact = ({ email, website, instagram }) => {
  return (
    <div className="flex flex-col gap-2 font-semibold text-[#344457] text-lg underline">
      <Info icon={<MdEmail />}>
        <CopyText>{email}</CopyText>
      </Info>
      <Info icon={<HiLink />} link={website.link} target="blank">
        {website.name}
      </Info>
      <Info icon={<RiInstagramFill />} link={instagram.link} target="blank">
        {instagram.name}
      </Info>
    </div>
  );
};

const Info = ({ children, icon, link, target }) => (
  <div>
    <div className="flex flex-row items-center gap-2">
      <div className="text-lg p-1 text-[#1C5EFF] bg-[#1C5EFF] bg-opacity-10 rounded-md">
        {icon}
      </div>
      <a target={target} href={link}>
        {children}
      </a>
    </div>
  </div>
);

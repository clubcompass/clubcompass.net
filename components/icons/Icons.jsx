import {
  FaTools,
  FaPaintBrush,
  FaTheaterMasks,
  FaFistRaised,
} from "react-icons/fa";
import { ImTrophy } from "react-icons/im";
import { HiAcademicCap, HiChip, HiOutlineFingerPrint } from "react-icons/hi";
import {
  MdSell,
  MdCalculate,
  MdDraw,
  MdSportsFootball,
  MdRecordVoiceOver,
  MdVolunteerActivism,
} from "react-icons/md";
import { RiHandCoinFill } from "react-icons/ri";
import {
  BsFillPeopleFill,
  BsLightbulbFill,
  BsHeartFill,
  BsMusicNote,
} from "react-icons/bs";
import { BiAtom } from "react-icons/bi";
import { RiGovernmentFill } from "react-icons/ri";
import { IoMdMicrophone } from "react-icons/io";

export const Icons = {
  volunteering: ({ ...props }) => <BsFillPeopleFill {...props} />,
  tech: ({ ...props }) => <HiChip {...props} />,
  math: ({ ...props }) => <MdCalculate {...props} />,
  engineering: ({ ...props }) => <FaTools {...props} />,
  science: ({ ...props }) => <BiAtom {...props} />,
  arts: ({ ...props }) => <FaPaintBrush {...props} />,
  creativity: ({ ...props }) => <BsLightbulbFill {...props} />,
  "academic competition": ({ ...props }) => <ImTrophy {...props} />,
  charity: ({ ...props }) => <RiHandCoinFill {...props} />,
  business: ({ ...props }) => <MdSell {...props} />,
  tutoring: ({ ...props }) => <HiAcademicCap {...props} />,
  writing: ({ ...props }) => <MdDraw {...props} />,
  sports: ({ ...props }) => <MdSportsFootball {...props} />,
  health: ({ ...props }) => <BsHeartFill {...props} />,
  politics: ({ ...props }) => <RiGovernmentFill {...props} />,
  music: ({ ...props }) => <BsMusicNote {...props} />,
  "performing arts": ({ ...props }) => <FaTheaterMasks {...props} />,
  culture: ({ ...props }) => <HiOutlineFingerPrint {...props} />,
  debate: ({ ...props }) => <IoMdMicrophone {...props} />,
  community: ({ ...props }) => <MdVolunteerActivism {...props} />,
  education: ({ ...props }) => <HiAcademicCap {...props} />,
  socializing: ({ ...props }) => <BsFillPeopleFill {...props} />,
  "public speaking": ({ ...props }) => <MdRecordVoiceOver {...props} />,
  "social activism": ({ ...props }) => <FaFistRaised {...props} />,
};

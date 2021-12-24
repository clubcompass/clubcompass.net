import { FaTools, FaPaintBrush } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";
import { HiAcademicCap } from "react-icons/hi";
import { MdSell, MdCalculate } from "react-icons/md";
import { RiHandCoinFill } from "react-icons/ri";
import {
  BsFillPeopleFill,
  BsTerminalFill,
  BsLightbulbFill,
} from "react-icons/bs";
import { BiAtom } from "react-icons/bi";

export const Icons = {
  math: ({ ...props }) => <MdCalculate {...props} />,
  science: ({ ...props }) => <BiAtom {...props} />,
  "computer science": ({ ...props }) => <BsTerminalFill {...props} />,
  art: ({ ...props }) => <FaPaintBrush {...props} />,
  creativity: ({ ...props }) => <BsLightbulbFill {...props} />,
  teamwork: ({ ...props }) => <BsFillPeopleFill {...props} />,
  competition: ({ ...props }) => <ImTrophy {...props} />,
  charity: ({ ...props }) => <RiHandCoinFill {...props} />,
  business: ({ ...props }) => <MdSell {...props} />,
  history: ({ ...props }) => <FaTools {...props} />,
  "academic aid": ({ ...props }) => <HiAcademicCap {...props} />,
};

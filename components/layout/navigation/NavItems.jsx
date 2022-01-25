import { NavLink } from "./NavLink";

import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";

export const NavItems = ({ mobile }) => {
  const links = [
    { name: "Home", target: "/", icon: <AiFillHome /> },
    { name: "Clubs", target: "/clubs", icon: <FaCompass /> },
    { name: "Dashboard", target: "/dashboard", icon: <MdDashboard /> },
    { name: "About", target: "/about", icon: <BsPeopleFill /> },
  ];

  return (
    <div
      className={
        mobile
          ? "mt-4 bg-ccGrey animate-drop"
          : "hidden lg:flex flex-col lg:flex-row items-center gap-4 justify-evenly text-cc w-1/4"
      }
    >
      {links.map((link, index) => (
        <NavLink mobile={mobile} key={index} {...link} />
      ))}
    </div>
  );
};

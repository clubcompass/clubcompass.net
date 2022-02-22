import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { NavLink } from "./NavLink";

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
          ? "flex flex-col items-start justify-center w-full h-1/2"
          : "hidden lg:flex flex-col lg:flex-row items-center gap-4 justify-evenly text-cc w-1/4"
      }
    >
      {links.map((link, index) => (
        <NavLink key={index} {...link} />
      ))}
    </div>
  );
};

import { useRouter } from "next/router";
import Link from "next/link";

import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";

export const NavCenter = () => {
  const links = [
    { name: "Home", target: "/", icon: <AiFillHome /> },
    { name: "Clubs", target: "/clubs", icon: <FaCompass /> },
    { name: "Dashboard", target: "/dashboard", icon: <MdDashboard /> },
    { name: "About", target: "/about", icon: <BsPeopleFill /> },
  ];

  return (
    <div className="flex flex-row items-center gap-4 justify-evenly text-cc w-1/4">
      {links.map((link, index) => (
        <NavLink key={index} {...link} />
      ))}
    </div>
  );
};

const NavLink = ({ target, name, icon }) => {
  const router = useRouter();
  const navStyle =
    router.asPath === target
      ? "bg-cc hover:bg-ccDark text-white"
      : "bg-ccGrey hover:bg-ccGreyDark text-black";

  return (
    <Link href={target}>
      <a className={`${navStyle} flex items-center gap-2 px-3 py-1 rounded-md`}>
        {icon}
        {name}
      </a>
    </Link>
  );
};

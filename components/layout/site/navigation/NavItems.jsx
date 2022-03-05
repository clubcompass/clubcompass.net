import { useRouter } from "next/router";
import { NavLink } from "./NavLink";

export const NavItems = ({ mobile }) => {
  const router = useRouter();
  const links = [
    { name: "Home", target: "/" },
    { name: "Clubs", target: "/clubs" },
    { name: "Dashboard", target: "/dashboard" },
    { name: "About", target: "/about" },
  ];

  return (
    <div
      className={
        mobile
          ? "flex flex-col items-start justify-center w-full h-1/2"
          : "hidden lg:flex flex-col lg:flex-row items-center gap-4 justify-center text-cc w-1/4"
      }
    >
      {links.map((link, index) => (
        <NavLink
          key={index}
          name={link.name}
          target={link.target}
          isActive={router.pathname === link.target}
        />
      ))}
    </div>
  );
};

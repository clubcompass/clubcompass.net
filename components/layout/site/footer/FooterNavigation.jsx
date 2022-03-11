import Link from "next/link";

export const FooterNavigation = () => {
  const links = [
    { href: "/twitter", name: "Twitter" },
    { href: "/instagram", name: "Instagram" },
    { href: "/about", name: "About us" },
    { href: "/contact/team", name: "Contact Us" },
    { href: "/contact/asb", name: "Contact ASB" },
  ];
  return (
    <div className="flex md:flex-row flex-col md:items-center justify-end items-start md:gap-4 gap-2 flex-1 ">
      {links.map(({ href, name }) => (
        <NavLink href={href} key={name}>
          {name}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a
        className="text-xs text-black hover:text-gray-600 transition duration-200 ease-in-out items-end"
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

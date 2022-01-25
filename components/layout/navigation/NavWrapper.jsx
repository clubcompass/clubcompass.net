import { NavItems } from "./NavItems";
import { NavLogo } from "./NavLogo";
import { NavLogin } from "./NavLogin";
import { NavProfile } from "./NavProfile";
import { NavHamburger } from "./NavHamburger";

export const NavWrapper = ({ name, profileColor }) => {
  return (
    <div className="flex flex-row px-6 lg:px-16 py-6 lg:py-10 justify-between items-center  w-screen">
      <NavHamburger />
      <NavLogo />
      <NavItems />
      {/* <NavLogin /> */}
      <NavProfile name={name} profileColor={profileColor} />
    </div>
  );
};

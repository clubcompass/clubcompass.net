import { NavCenter } from "./NavCenter";
import { NavLeft } from "./NavLeft";
import { NavRight } from "./NavRight";
import { NavRightAlt } from "./NavRightAlt";
import { NavHamburger } from "./NavHamburger";

export const NavWrapper = ({ name, profileColor }) => {
  return (
    <div className="flex flex-row px-6 lg:px-16 py-10 justify-between items-center  w-screen">
      <NavHamburger />
      <NavLeft />
      <NavCenter />
      {/* <NavRight /> */}
      <NavRightAlt name={name} profileColor={profileColor} />
    </div>
  );
};

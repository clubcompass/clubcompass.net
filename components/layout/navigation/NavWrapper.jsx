import { NavCenter } from "./NavCenter";
import { NavLeft } from "./NavLeft";
import { NavRight } from "./NavRight";
import { NavRightAlt } from "./NavRightAlt";

export const NavWrapper = ({ name, profileColor }) => {
  return (
    <div className="w-screen px-16 py-10 flex justify-between items-center">
      <NavLeft />
      <NavCenter />
      {/* <NavRight /> */}
      <NavRightAlt name={name} profileColor={profileColor} />
    </div>
  );
};

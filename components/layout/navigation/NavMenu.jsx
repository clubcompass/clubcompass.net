import { NavItems } from "./NavItems";

export const NavMenu = () => {
  return (
    <div className="absolute -ml-6 mt-16 pt-[4.5rem] pl-3 w-full bg-ccGrey">
      <NavItems mobile={true} />
    </div>
  );
};

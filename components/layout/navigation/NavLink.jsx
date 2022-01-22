import { useRouter } from "next/router";
import Link from "next/link";
import { NavHamburger } from "./NavHamburger";
import { CloseMenu } from "./NavHamburger";

export const NavLink = ({ mobile, target, name, icon }) => {
  const router = useRouter();
  const navStyle =
    router.asPath === target
      ? "bg-cc hover:bg-ccDark text-white"
      : "bg-ccGrey hover:bg-ccGreyDark text-black";
  return (
    <Link href={target}>
      <a
        onClick={mobile ? CloseMenu : ""}
        className={
          mobile
            ? navStyle +
              " first:mt-8 last:border-b-0 flex items-center -ml-3 pl-7 py-2 gap-4 border-b-2"
            : navStyle + " flex items-center gap-2 px-3 py-1 rounded-md"
        }
      >
        {icon}
        {name}
      </a>
    </Link>
  );
};

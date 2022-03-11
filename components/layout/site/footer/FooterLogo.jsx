import Link from "next/link";
import { CCIcon } from "../../../custom/cc";

export const FooterLogo = () => {
  return (
    <Link href="/">
      <a className="w-full flex flex-row flex-1 items-center gap-3">
        <div className="w-3.5">
          <CCIcon color="cc" />
        </div>
        <span className="text-xs">
          Club Compass - Redefining Club Discovery
        </span>
      </a>
    </Link>
  );
};

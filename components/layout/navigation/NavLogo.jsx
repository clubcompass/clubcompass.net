import Link from "next/link";
import Image from "next/image";

import { CloseMenu } from "..";

export const NavLogo = () => {
  return (
    <Link href="/">
      <a onClick={CloseMenu} className="flex items-center">
        <a className="w-[40px] h-[40px] md:mr-4">
          <Image src="/cc-auth.svg" alt="cc" width={40} height={40} />
        </a>
        <h1 className="hidden md:flex z-10 text-2xl tracking-wider font-bold">
          Club Compass
        </h1>
      </a>
    </Link>
  );
};

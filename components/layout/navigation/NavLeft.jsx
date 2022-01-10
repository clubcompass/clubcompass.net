import Link from "next/link";
import Image from "next/image";

export const NavLeft = () => {
  return (
    <Link href="/">
      <a className="flex items-center">
        <a className="w-[40px] h-[40px] mr-4">
          <Image src="/cc-auth.svg" alt="cc" width={40} height={40} />
        </a>
        <h1 className="text-2xl tracking-wider font-bold">Club Compass</h1>
      </a>
    </Link>
  );
};

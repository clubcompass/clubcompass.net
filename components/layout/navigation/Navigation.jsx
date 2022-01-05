import React from "react";
import Image from "next/image";
import Link from "next/link";
export const Navigation = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/">
        <a className="w-[25px] h-[25px]">
          <Image src="/cc-auth.svg" alt="cc" width={25} height={25} />
        </a>
      </Link>
      <div className="flex flex-row items-center justify-evenly text-cc w-1/4">
        <Link href="/clubs">
          <a>clubs</a>
        </Link>
        <Link href="/login">
          <a>login</a>
        </Link>
        <Link href="/dashboard">
          <a>my clubs</a>
        </Link>
      </div>
    </div>
  );
};

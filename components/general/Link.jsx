import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";
// decorative, basic, and functional

export const CCLink = ({ slug }) => {
  return (
    <Link href={`/club/${slug}`}>
      <a className="font-bold text-[#2575E5]">
        <div className="relative flex flex-row items-end left-1 group transition duration-200 ease-in-out">
          Learn more <HiChevronRight className="text-lg relative bottom-0.5" />
          <span className="absolute bg-cc/10 w-[90%] h-2 group-hover:h-[1.2rem] rounded-sm -left-1 bottom-0.5 transition-height duration-200 ease-in-out" />
        </div>
      </a>
    </Link>
  );
};

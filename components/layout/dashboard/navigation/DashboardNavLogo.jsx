import React from "react";
import Link from "next/link";
import { CCIcon } from "../../../custom";

export const DashboardNavLogo = () => {
  return (
    <Link href="/">
      <a className="flex items-center">
        <div className="mr-4 w-[30px] h-[30px]">
          <CCIcon color={"cc"} />
        </div>
        <h1 className="text-xl tracking-wider font-bold">Club Compass</h1>
      </a>
    </Link>
  );
};

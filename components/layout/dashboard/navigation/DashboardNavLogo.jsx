import React from "react";
import Link from "next/link";
import { CCIcon } from "../../../custom";

export const DashboardNavLogo = () => {
  return (
    <Link href="/">
      <a className="flex items-center">
        <div className="mr-3 w-[25px] h-[25px]">
          <CCIcon color="cc" />
        </div>
        <h1 className="text-lg tracking-wider font-semibold">Club Compass</h1>
      </a>
    </Link>
  );
};

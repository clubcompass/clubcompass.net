import React from "react";
import Link from "next/link";
import { CCIcon } from "../../../custom";
import { useBreakpoints } from "../../../../hooks";

export const DashboardNavLogo = () => {
  const { isSm, isXs } = useBreakpoints();
  const isMobile = isSm || isXs;

  return (
    <Link href="/">
      <a className="flex items-center gap-4">
        <div className="h-[30px] w-[30px]">
          <CCIcon color="cc" />
        </div>
        {/* {!isMobile && (
          <h1 className="text-lg font-semibold tracking-wider">Club Compass</h1>
        )} */}
      </a>
    </Link>
  );
};

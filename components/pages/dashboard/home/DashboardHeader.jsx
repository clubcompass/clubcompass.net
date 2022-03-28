import React from "react";
import { useState } from "react";
import { CopyText } from "../../../general/CopyText";
import { MdContentCopy } from "react-icons/md";

export const DashboardHeader = ({ name, ccid, delay }) => {
  let timeout;
  const [active, setActive] = useState(false);

  const setCopied = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, delay || 1000);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[#9B9B9B]">
        <p className="font-semibold tracking-wide">Your CCID:</p>
        <div
          role="button"
          onClick={setCopied}
          className="flex items-center gap-1">
          <div
            className={`${
              active
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-[#EBF3FF] text-[#285EF9]"
            } flex w-[85px] items-center justify-center gap-2 rounded-sm px-2`}>
            {active ? (
              <p className="font-semibold">Copied!</p>
            ) : (
              <CopyText>{ccid}</CopyText>
            )}
          </div>
          <MdContentCopy className="text-sm" />
        </div>
      </div>
    </div>
  );
};

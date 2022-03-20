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
    <div className="mt-4 flex flex-col gap-2">
      <h4 className="text-2xl tracking-wide">Welcome back, {name}</h4>
      <div className="flex gap-2 items-center text-[#9B9B9B]">
        <p>Your CCID:</p>
        <div
          role="button"
          onClick={setCopied}
          className="flex items-center gap-1"
        >
          <div
            className={`${
              active
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-[#EBF3FF] text-[#285EF9]"
            } w-[85px] flex justify-center items-center gap-2 px-2 rounded-sm`}
          >
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

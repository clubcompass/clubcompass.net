import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";

export const Button = () => {
  const [joined, setJoined] = useState(false);

  return (
    <button
      className={`${
        joined ? "bg-[#FF5555]" : "bg-[#2575E5]"
      } flex flex-row justify-center items-center gap-1 rounded-lg px-5 py-0.5`}
      onClick={() => setJoined(!joined)}
    >
      {joined ? (
        <>
          <FiLogOut className="text-white text-sm stroke-[4px] " />
          <span className="font-bold text-[15px] text-white">Leave</span>
        </>
      ) : (
        <>
          <HiPlusSm className="text-white text-md stroke-[1.5px]" />
          <span className="font-bold text-[15px] text-white">Join</span>
        </>
      )}
    </button>
  );
};

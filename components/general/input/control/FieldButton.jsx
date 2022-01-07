import React from "react";

export const FieldButton = ({ primary, disabled, label }) => {
  const p = {
    active: "bg-[#1C5EF9] text-white hover:bg-[#457dff]",
    disabled: "bg-opacity-30 cursor-not-allowed bg-[#1C5EF9] text-white",
  };
  const s = {
    active: "bg-[#EFEFEF] text-black hover:bg-[#f7f7f7]",
    disabled:
      "bg-opacity-30 cursor-not-allowed bg-[#EFEFEF] text-black text-opacity-30",
  };
  return (
    <button
      disabled={disabled}
      className={`${
        disabled
          ? primary
            ? p.disabled
            : s.disabled
          : primary
          ? p.active
          : s.active
      } w-full py-2 font-[600] rounded-lg transition duration-200 ease-in-out`}
    >
      {label}
    </button>
  );
};

import React from "react";
import { CgSpinner } from "react-icons/cg";
export const FieldButton = ({ primary, disabled, label, loading }) => {
  const p = {
    active: "bg-cc text-white hover:bg-[#457dff]",
    disabled: "bg-opacity-30 cursor-not-allowed bg-cc text-white",
  };
  const s = {
    active: "bg-[#EFEFEF] text-black hover:bg-[#f7f7f7]",
    disabled:
      "bg-opacity-30 cursor-not-allowed bg-[#EFEFEF] text-black text-opacity-30",
  };
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`${
        disabled
          ? primary
            ? p.disabled
            : s.disabled
          : primary
          ? p.active
          : s.active
      } flex items-center justify-center w-full py-2 font-[600] rounded-xl transition duration-200 ease-in-out`}
    >
      {loading ? (
        <CgSpinner className="animate-spin text-[26px] p-0.5" />
      ) : (
        label
      )}
    </button>
  );
};

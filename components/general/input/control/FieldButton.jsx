import React from "react";
import { CgSpinner } from "react-icons/cg";
export const FieldButton = ({
  primary,
  disabled,
  label,
  icon,
  loading,
  ...props
}) => {
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
      type={props?.type || "button"}
      {...props}
      className={`${
        disabled
          ? primary
            ? p.disabled
            : s.disabled
          : primary
          ? p.active
          : s.active
      } flex w-full items-center justify-center rounded-xl py-2 font-[600] transition duration-200 ease-in-out`}
    >
      {loading ? (
        <CgSpinner className="animate-spin p-0.5 text-[26px]" />
      ) : (
        label ?? icon
      )}
    </button>
  );
};

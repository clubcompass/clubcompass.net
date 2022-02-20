import React from "react";
import { CgSpinner } from "react-icons/cg";

export const OnboardingFieldButton = ({
  primary,
  label,
  action,
  disabled,
  asSubmission,
  loading,
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
      type={primary && asSubmission ? "submit" : "button"}
      disabled={disabled || loading}
      onClick={action}
      className={`${
        disabled || loading
          ? primary
            ? p.disabled
            : s.disabled
          : primary
          ? p.active
          : s.active
      } w-full py-2 font-[600] rounded-lg transition duration-200 ease-in-out`}
    >
      {loading ? <CgSpinner className="animate-spin text-lg mx-auto" /> : label}
    </button>
  );
};

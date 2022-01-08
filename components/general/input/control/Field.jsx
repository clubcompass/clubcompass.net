import React, { useState } from "react";

export const Field = ({ label, type }) => {
  const [touched, setTouched] = useState(false);
  const [isContent, setIsContent] = useState(false);

  return (
    <div className="relative">
      <label
        className={`transform ${
          isContent || touched
            ? touched
              ? "-translate-y-[19px] uppercase text-xs text-[#1C5EF9]"
              : "-translate-y-[19px] uppercase text-xs text-[#3f3f3f]"
            : "translate-y-0 text-disabled capitalize text-[#686868]"
        } absolute top-[15px] left-[18px] font-semibold transition duration-200 ease-in-out bg-white px-1 leading-[0.9] pointer-events-none`}
      >
        {label}
      </label>
      <input
        type={type}
        className={`${
          isContent || touched
            ? touched
              ? "border-[#1C5EF9] ring-2"
              : "border-[#E3E7EA]"
            : ""
        } outline-none px-4 py-2 font-bold text-base border-2 rounded-xl w-full`}
        onFocus={() => setTouched(true)}
        onBlur={() => setTouched(false)}
        onChange={(e) => {
          e.target.value !== "" ? setIsContent(true) : setIsContent(false);
        }}
      />
    </div>
  );
};

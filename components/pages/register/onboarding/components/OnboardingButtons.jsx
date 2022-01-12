import React from "react";
import Link from "next/link";

export const Buttons = ({ buttons, asSubmission }) => {
  return (
    <div className="w-full col-span-6 max-w-[495px]">
      <div className="flex flex-row gap-2">
        {buttons.map((btn, index) => {
          if (btn.type === "link") {
            return (
              <Link href={btn.action} key={index}>
                <a className="w-full">
                  <Button primary={btn.primary} label={btn.label} />
                </a>
              </Link>
            );
          } else {
            return (
              <Button
                key={index}
                primary={btn.primary}
                label={btn.label}
                onClick={() => btn.action()}
                disabled={btn.disabled}
                asSubmission={asSubmission}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

const Button = ({ primary, label, onClick, disabled, asSubmission }) => {
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
      type={primary && asSubmission ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
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

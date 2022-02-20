import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { GoCheck } from "react-icons/go";

export const FieldCheckbox = ({ isChecked, toggleChecked }) => {
  const [focused, setFocused] = useState(false);

  const check = useTransition(isChecked, {
    from: { opacity: 0, transform: "translate(0px, 20px)" },
    enter: { opacity: 1, transform: "translate(0px, 0px)" },
    leave: { opacity: 0, transform: "translate(0px, 20px)" },
    config: { tension: 180, friction: 14 },
  });

  const AnimatedCheck = animated(GoCheck);
  return (
    <label
      onClick={toggleChecked}
      className="inline-flex flex-row items-center gap-1 col-span-3 select-none outline-none"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
    >
      <div
        className={`${isChecked && "border-cc bg-cc"} ${
          focused && isChecked && "ring-2"
        }  h-4 w-4 flex items-center justify-center border-2 rounded-[5px] transition duration-200 ease-in-out cursor-pointer`}
        role="checkbox"
        aria-checked={isChecked}
      >
        {check(
          (style, item) =>
            item && (
              <AnimatedCheck style={style} className="text-white text-xs" />
            )
        )}
      </div>
      <span className="text-sm font-medium">Remember me</span>
    </label>
  );
};

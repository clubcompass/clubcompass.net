import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
export const Field = ({
  field,
  label,
  name,
  id,
  value,
  form: { touched, errors },
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [isContent, setIsContent] = useState(false);

  useEffect(() => {
    if (value !== "") {
      setIsContent(true);
    } else {
      setIsContent(false);
    }
  }, [value]);

  return (
    <React.Fragment>
      <div className="relative">
        <label
          htmlFor={id}
          className={`transform ${
            isContent || active
              ? active
                ? `${
                    touched[field.name] &&
                    errors[field.name] &&
                    "text-[#FF7C7C]"
                  } -translate-y-[19px] uppercase text-xs text-[#1C5EF9]`
                : `${
                    touched[field.name] &&
                    errors[field.name] &&
                    "text-[#FF7C7C]"
                  } -translate-y-[19px] uppercase text-xs text-[#3f3f3f]`
              : "translate-y-0 text-disabled capitalize text-[#686868]"
          } absolute top-[15px] left-[18px] font-semibold transition duration-200 ease-in-out bg-white px-1 leading-[0.9] pointer-events-none`}
        >
          {label}
        </label>
        <input
          id={id}
          type="text"
          className={`${
            isContent || active
              ? active
                ? "border-[#1C5EF9] ring-2"
                : "border-[#E3E7EA]"
              : ""
          } ${
            touched[field.name] &&
            errors[field.name] &&
            "border-[#FF7C7C] ring-2 ring-[#FF7C7C]/20"
          } outline-none px-4 py-2 font-bold text-base border-2 rounded-xl w-full`}
          {...field}
          {...props}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
        {touched[field.name] && errors[field.name] && (
          <div className="absolute top-[-8px] -right-1">
            <MdError className="text-[#FF7C7C] text-lg bg-[#FFE5E6] rounded-full" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

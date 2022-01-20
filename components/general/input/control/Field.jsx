import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
export const Field = ({
  field,
  label,
  name,
  id,
  value,
  form: { touched, errors },
  type,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [hidden, setHidden] = useState(true);

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
                    touched[field.name] && errors[field.name] && "text-red-500"
                  } -translate-y-[19px] uppercase text-xs text-[#1C5EF9]`
                : `${
                    touched[field.name] && errors[field.name] && "text-red-500"
                  } -translate-y-[19px] uppercase text-xs text-[#3f3f3f]`
              : "translate-y-0 text-disabled capitalize text-[#686868]"
          } absolute top-[15px] left-[18px] font-semibold transition duration-200 ease-in-out bg-white px-1 leading-[0.9] pointer-events-none`}
        >
          {label}
        </label>
        <input
          id={id}
          value={value}
          type={type === "password" ? (hidden ? "password" : "text") : type}
          className={`${
            isContent || active
              ? active
                ? "border-[#1C5EF9] ring-2"
                : "border-[#E3E7EA]"
              : ""
          } ${
            touched[field.name] &&
            errors[field.name] &&
            "border-red-500 ring-2 ring-red-500/20"
          } outline-none px-4 py-2 font-bold text-base border-2 rounded-xl w-full`}
          {...field}
          {...props}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
        {type === "password" && (
          <div
            className="absolute top-[14px] right-[18px] cursor-pointer transition duration-200 ease-in-out transform"
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        )}
        {touched[field.name] && errors[field.name] && (
          <>
            <ErrorIcon />
            <ErrorMessage message={errors[field.name]} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

const ErrorIcon = () => {
  return (
    <div className="absolute top-[-8px] -right-1">
      <MdError className="text-red-500 text-lg bg-white rounded-full" />
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full relative mt-2">
      <p className="text-red-500 text-xs">{message}</p>
    </div>
  );
};

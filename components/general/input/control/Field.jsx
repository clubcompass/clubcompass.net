import React, { useEffect, useState } from "react";
import { useSpring, animated, config, to } from "react-spring";
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
  textarea,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [hidden, setHidden] = useState(true);

  const animateLabel = useSpring({
    from: { transform: "translate(0px, 0px)" },
    to: {
      transform:
        active || isContent ? "translate(-4px,-20px)" : "translate(0px, 0px)",
      fontSize: active || isContent ? "13px" : "16px",
    },
    config: { tension: 300, friction: 20, mass: 1 },
  });

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
        <animated.label
          style={animateLabel}
          htmlFor={id}
          className={`transform ${
            isContent || active
              ? active
                ? `${
                    touched[field.name] && errors[field.name] && "text-red-500"
                  } text-cc`
                : `${
                    touched[field.name] && errors[field.name] && "text-red-500"
                  } text-gray-500`
              : "text-disabled translate-y-0 capitalize text-[#686868]"
          } pointer-events-none absolute top-[15px] left-[18px] bg-white px-1 font-semibold leading-[0.9] `}
        >
          {label}
        </animated.label>
        {textarea ? (
          <textarea
            id={id}
            value={value}
            type={type === "password" ? (hidden ? "password" : "text") : type}
            className={`${
              isContent || active
                ? active
                  ? "border-cc ring-2"
                  : "border-[#E3E7EA]"
                : ""
            } ${
              touched[field.name] &&
              errors[field.name] &&
              "border-red-500 ring-2 ring-red-500/20"
            } w-full rounded-xl border-2 px-4 py-2 text-base font-bold outline-none transition duration-200 ease-in-out`}
            {...field}
            {...props}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />
        ) : (
          <input
            id={id}
            value={value}
            type={type === "password" ? (hidden ? "password" : "text") : type}
            className={`${
              isContent || active
                ? active
                  ? "border-cc ring-2"
                  : "border-[#E3E7EA]"
                : ""
            } ${
              touched[field.name] &&
              errors[field.name] &&
              "border-red-500 ring-2 ring-red-500/20"
            } w-full rounded-xl border-2 px-4 py-2 text-base font-bold outline-none transition duration-200 ease-in-out`}
            {...field}
            {...props}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />
        )}

        {type === "password" && (
          <div
            className="absolute top-[14px] right-[18px] transform cursor-pointer transition duration-200 ease-in-out"
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
      <MdError className="rounded-full bg-white text-lg text-red-500" />
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div className="relative mt-2 w-full">
      <p className="text-xs text-red-500">{message}</p>
    </div>
  );
};

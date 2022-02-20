import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
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
              : "translate-y-0 text-disabled capitalize text-[#686868]"
          } absolute top-[15px] left-[18px] font-semibold bg-white px-1 leading-[0.9] pointer-events-none `}
        >
          {label}
        </animated.label>
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
          } outline-none px-4 py-2 font-bold text-base border-2 rounded-xl w-full transition duration-200 ease-in-out`}
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

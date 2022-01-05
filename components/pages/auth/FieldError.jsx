import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
export const FieldError = (message) => {
  return (
    <div className="relative group">
      <RiErrorWarningFill className="absolute text-xl right-4 -top-9 text-red-500" />
      <p className="hidden group-hover:block absolute text-xs right-4 -top-[4.2rem] text-red-500 rounded-lg px-2 py-1 bg-red-100">
        {message}
      </p>
    </div>
  );
};

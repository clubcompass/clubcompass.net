import React from "react";
import { Field, ErrorMessage } from "formik";
import { FieldError } from "./FieldError";

export const AuthField = ({ label, ...props }) => {
  return (
    <div className="mb-4 w-full">
      <Label {...label} />
      <div>
        <Field
          className="mt-1 px-4 py-3 text-black text-opacity-80 bg-transparent block w-full rounded-2xl border-2 border-opacity-20 focus:border-cc focus:ring focus:ring-cc focus:ring-opacity-50"
          {...props}
        />
        <ErrorMessage name={label.htmlFor} render={FieldError} />
      </div>
    </div>
  );
};

const Label = ({ label, htmlFor }) => (
  <label className="text-black font-bold text-sm" htmlFor={htmlFor}>
    {label}
  </label>
);

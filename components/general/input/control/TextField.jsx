import React from "react";
import { FieldLabel as Label } from ".";

export const TextField = ({
  label,
  type,
  placeholder,
  field,
  form: { errors, touched },
  textarea,
  z,
}) => {
  return (
    <div className="w-full" style={{ zIndex: z || 10 }}>
      <label className="relative block">
        {label && <Label {...label} />}
        {textarea ? (
          <textarea
            className={`${
              label && "mt-1"
            } form-input  block h-24 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            placeholder={placeholder || ""}
            {...field}
          />
        ) : (
          <input
            type={type || "text"}
            className={`${
              label && "mt-1"
            } form-input block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            placeholder={placeholder || ""}
            {...field}
          />
        )}
      </label>
      {errors[field.name] && touched[field.name] ? (
        <div className="mt-1 text-xs text-red-500">{errors[field.name]}</div>
      ) : null}
    </div>
  );
};

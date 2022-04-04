import { FieldProps } from "formik";
import React, { ReactChild } from "react";

type Option = {
  label: string;
  value: string;
};

interface Props extends FieldProps {
  label: string;
  direction: "row" | "column";
  options: Option[];
  span?: number;
}

export const DashboardRadio = ({
  label,
  direction,
  options,
  span,
  field,
}: Props) => {
  const { value, ...rest } = field;
  return (
    <div
      role="group"
      aria-labelledby={label}
      style={{ gridColumn: `span ${span}` }}
    >
      <OptionsContainer label={label} direction={direction}>
        {options.map((option) => (
          <Option key={option.value} {...option} {...rest} />
        ))}
      </OptionsContainer>
    </div>
  );
};

const Option = ({
  label,
  value,
  ...field
}: Option & Omit<FieldProps["field"], "value">) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        className="form-radio h-4 w-4 cursor-pointer border-gray-300 text-cc focus:ring-cc"
        type="radio"
        value={value}
        {...field}
      />
      <label className="text-sm font-medium">{label}</label>
    </div>
  );
};

const OptionsContainer = ({
  label,
  direction,
  children,
}: {
  label: string;
  direction: "row" | "column";
  children: ReactChild[];
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm">{label}</label>
    <div style={{ flexDirection: direction || "row" }} className="flex gap-3">
      {children}
    </div>
  </div>
);

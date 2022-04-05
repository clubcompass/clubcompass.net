import { FieldProps } from "formik";
import React, { ReactChild } from "react";

type Option = {
  label: string;
  value: string;
};

interface Props extends FieldProps {
  label: string;
  description: string;
  direction: "row" | "column";
  options: Option[];
  span?: number;
}

export const DashboardRadio = ({
  label,
  description,
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
      <OptionsContainer
        label={label}
        description={description}
        direction={direction}
      >
        {options.map((option) => (
          <Option key={option.value} {...option} current={value} {...rest} />
        ))}
      </OptionsContainer>
    </div>
  );
};

const Option = ({
  label,
  value,
  current,
  ...field
}: Option & Omit<FieldProps["field"], "value"> & { current: string }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        className="form-radio h-4 w-4 cursor-pointer border-gray-300 text-cc focus:ring-cc"
        type="radio"
        value={value}
        checked={value === current}
        {...field}
      />
      <label className="text-sm font-medium">{label}</label>
    </div>
  );
};

const OptionsContainer = ({
  label,
  description,
  direction,
  children,
}: {
  label: string;
  description: string;
  direction: "row" | "column";
  children: ReactChild[];
}) => (
  <div className="flex flex-col gap-2">
    {(label || description) && (
      <div className="flex flex-col">
        {label && <span className="text-sm">{label}</span>}
        {description && (
          <span className="text-sm text-gray-300">{description}</span>
        )}
      </div>
    )}
    <div style={{ flexDirection: direction || "row" }} className="flex gap-3">
      {children}
    </div>
  </div>
);

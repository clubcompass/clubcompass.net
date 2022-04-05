import React from "react";
import Select from "react-select";
import { FieldLabel as Label } from "./FieldLabel";
export const FieldSelect = ({
  field,
  form: { errors, touched, setFieldValue, values },
  label,
  z,
  props,
}) => {
  //TODO: use headless ui

  const handleSelection = (selected) => {
    if (props?.isMulti) {
      if (selected === null || selected.length <= props.max) {
        return setFieldValue(
          field.name,
          selected.map((s) => s.value)
        );
      }
    } else {
      return setFieldValue(field.name, selected.value);
    }
  };
  return (
    <div className="w-full" style={{ zIndex: z || 10 }}>
      <label className="relative block">
        {label && <Label {...label} />}
        <div className="mt-1">
          <Select
            {...props}
            onChange={handleSelection}
            isOptionDisabled={(option) =>
              values[field.name].length >= props?.max
            }
          />
        </div>
      </label>
      {errors[field.name] && touched[field.name] ? (
        <div className="mt-1 text-xs text-red-500">{errors[field.name]}</div>
      ) : null}
    </div>
  );
};

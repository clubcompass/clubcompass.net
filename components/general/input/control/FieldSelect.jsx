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
  //TODO: STYLE REACT-SELECT COMPONENT https://react-select.com/styles#style-object
  // const colourStyles = {
  //   control: (styles, { isFocused, isSelected }) => ({
  //     ...styles,
  //     backgroundColor: "white",
  //     border:
  //       isFocused || isSelected
  //         ? "1px solid rgb(165 180 252)"
  //         : "1px solid #d1d5db",
  //     borderRadius: "6px",
  //     boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  //   }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled ? "red" : "blue",
  //       color: "#FFF",
  //       cursor: isDisabled ? "not-allowed" : "default",
  //     };
  //   },
  // };

  console.log(field.name, values[field.name]);

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
        {/* <Select {...props} styles={colourStyles} /> */}
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

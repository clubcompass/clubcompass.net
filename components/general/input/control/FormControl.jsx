import React from "react";
import { Field, FieldButton as Button } from ".";
export const FormControl = ({ config }) => {
  return (
    <div className="w-[495px] flex flex-col gap-3">
      {config.map((config, index) => (
        <ControlGroup key={index} {...config} />
      ))}
    </div>
  );
};

const ControlGroup = ({ general, form, button }) => {
  return (
    <Container {...general}>
      <Field {...form} />
      <Button {...button} />
    </Container>
  );
};

const Container = ({ children, visible, layout }) => {
  const [field, button] = children;
  return (
    <div
      className={`w-full ${
        visible ? "grid grid-cols-6 gap-3 items-center" : "hidden"
      } `}
    >
      <div
        className={`${
          layout === "1/2"
            ? "col-span-3"
            : layout === "3/4"
            ? "col-span-4"
            : layout === "full"
            ? "col-span-6"
            : "col-span-6"
        }`}
      >
        {field}
      </div>
      <div
        className={`${
          layout === "1/2"
            ? "col-span-3"
            : layout === "3/4"
            ? "col-span-2"
            : layout === "full"
            ? "col-span-6"
            : "col-span-6"
        }`}
      >
        {button}
      </div>
    </div>
  );
};

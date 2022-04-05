import React from "react";
import { Tab } from "@headlessui/react";
import { useField } from "formik";

export const OptionSelection = ({ name, options, current, setCurrent }) => {
  const [field, meta, { setValue }] = useField(name);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full max-w-[495px] sm:px-0">
      <Tab.Group
        defaultIndex={options.indexOf(current)}
        onChange={(index) => {
          setValue(options[index]);
          // setCurrent({ value: options[index] });
        }}
      >
        <Tab.List className="flex space-x-1 rounded-xl border-2 p-1">
          {options.map((name) => (
            <Tab
              key={name}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2 text-sm font-medium leading-5",
                  "capitalize ring-white ring-opacity-60 ring-offset-2 ring-offset-[#A0C0FC] focus:outline-none focus:ring-2",
                  selected
                    ? "bg-cc text-white shadow"
                    : "text-black hover:bg-[#EEEFEF]"
                )
              }
            >
              {name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

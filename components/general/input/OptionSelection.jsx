import React from "react";
import { Tab } from "@headlessui/react";

export const OptionSelection = ({ options }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full max-w-[495px] sm:px-0">
      <Tab.Group
        onChange={(index) => {
          console.log("Changed selected tab to:", options[index]);
        }}
      >
        <Tab.List className="flex p-1 space-x-1 border-2 rounded-xl">
          {options.map((name) => (
            <Tab
              key={name}
              className={({ selected }) =>
                classNames(
                  "w-full py-2 text-sm leading-5 font-medium rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#A0C0FC] ring-white ring-opacity-60 capitalize",
                  selected
                    ? "bg-[#1C5EF9] shadow text-white"
                    : "hover:bg-[#EEEFEF] text-black"
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

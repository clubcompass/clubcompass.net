import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaGlobeAmericas } from "react-icons/fa";
import { RemindIcon } from "../../../../custom/RemindIcon";

const types = [
  { name: "WEBSITE" },
  { name: "INSTAGRAM" },
  { name: "TWITTER" },
  { name: "DISCORD" },
  { name: "YOUTUBE" },
  { name: "FACEBOOK" },
  { name: "REMIND" },
];

const colors = {
  WEBSITE: {
    bg: "#E5E7EB",
    fg: "#4B5463",
  },
  INSTAGRAM: {
    bg: "#F7E3EC",
    fg: "#FE0071",
  },
  TWITTER: {
    bg: "#E5EFF8",
    fg: "#0099F0",
  },
  DISCORD: {
    bg: "#EAEBF7",
    fg: "#4A62F8",
  },
  YOUTUBE: {
    bg: "#FBE4E4",
    fg: "#FF0000",
  },
  FACEBOOK: {
    bg: "#E4EDF6",
    fg: "#0075F4",
  },
  REMIND: {
    bg: "#E7F0F6",
    fg: "#2787DB",
  },
};

export const DashboardDropdown = ({ label, field, form }) => {
  const [selected, setSelected] = useState(types[0]);

  useEffect(() => {
    form.setFieldValue(field.name, selected.name);
  }, [selected]);

  return (
    <div className="relative flex items-center gap-2 text-sm">
      <p>{label}:</p>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative flex items-center gap-2">
            <div
              style={{ background: colors[selected.name].bg }}
              className="flex items-center gap-2 rounded-lg bg-white py-1 pr-3 text-left text-sm focus:outline-none focus-visible:border-cc focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cc/30">
              <span
                style={{ color: colors[selected.name].fg }}
                className="flex items-center pl-3">
                <Icon type={selected.name} />
              </span>
              <span
                style={{ color: colors[selected.name].fg }}
                className="block truncate capitalize">
                {selected.name.toLowerCase()}
              </span>
            </div>
            <FiChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-[130px] overflow-auto rounded-md bg-white px-1 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {types.map((type, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none rounded-md py-2 pl-10 pr-4 ${
                      active ? `bg-gray-200` : "text-gray-900"
                    }`
                  }
                  value={type}>
                  {({ selected }) => (
                    <>
                      <span
                        style={{ color: colors[type.name].fg }}
                        className={`block truncate capitalize ${
                          selected ? "font-medium" : "font-normal"
                        }`}>
                        {type.name.toLowerCase()}
                      </span>
                      <span
                        style={{ color: colors[type.name].fg }}
                        className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon type={type.name} />
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const Icon = ({ type }) => {
  if (type === "INSTAGRAM") return <RiInstagramFill />;
  if (type === "TWITTER") return <AiOutlineTwitter />;
  if (type === "DISCORD") return <FaDiscord />;
  if (type === "YOUTUBE") return <AiFillYoutube />;
  if (type === "FACEBOOK") return <MdOutlineFacebook />;
  if (type === "REMIND")
    return (
      <div className="h-[13px] w-[13px]">
        <RemindIcon color={"#2787DB"} />
      </div>
    );

  return <FaGlobeAmericas />;
};

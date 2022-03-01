import React, { useState, Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { MdFilterAlt } from "react-icons/md";
import { db } from "../../../../lib/database";
import { tagSchema } from "../../../general/tags";
import { Icons } from "../../../general/icons";
export const ToolbarFilter = ({ sortOptions }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const {
    data: tags,
    error,
    isLoading,
  } = useQuery("tags", async () => await db.tags.get(), {
    refetchOnWindowFocus: false,
  });

  const handleSelection = (tag) => {
    const tagIndex = selectedTags.indexOf(tag);
    if (tagIndex === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const Tag = ({ id, name, _count: { clubs: count } }) => (
    <Menu.Item>
      {({ active }) => (
        <div
          role="button"
          className="flex flex-row items-center gap-2 cursor-pointer rounded-md px-1 py-1"
          onClick={() => handleSelection(id)}
        >
          <div
            className="flex flex-row items-center gap-1.5 px-2 py-1 rounded-md"
            style={{
              backgroundColor: selectedTags.includes(id)
                ? tagSchema[name].bg
                : "#F8FAFB",
            }}
          >
            {Icons[name]({
              className: "text-lg",
            })}
            <span className="group flex w-full items-center text-sm font-medium capitalize">
              {name}
            </span>
          </div>
          <span
            style={{
              backgroundColor: selectedTags.includes(id)
                ? tagSchema[name].bg
                : "#F8FAFB",
            }}
            className="px-2 py-1.5 rounded-md text-xs font-medium"
          >
            {count}
          </span>
        </div>
      )}
    </Menu.Item>
  );

  const MenuItems = () => {
    if (isLoading || !tags) return "Loading...";
    return (
      <>
        {tags.map((tag, i) => (
          <div className="px-1 py-1" key={i}>
            <Tag {...tag} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-row items-center gap-2 z-30">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button
            role="button"
            className="relative flex flex-row items-center gap-1 rounded-lg border-[1px] px-2 py-1 text-center text-sm font-semibold text-black"
          >
            <div className="flex flex-row items-center gap-1">
              <MdFilterAlt className="text-lg" />
              <span>Filter</span>
            </div>
            <HiChevronDown className="relative top-[0.25px] h-4 w-4" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute left-0 mt-2 w-[16rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-56 overflow-y-scroll"
          >
            <MenuItems />
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

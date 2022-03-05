import React, { useState, Fragment, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { db } from "../../../../lib/database";
import { tagSchema } from "../../../general/tags";
import { Icons } from "../../../general/icons";
export const ToolbarFilter = ({ staticClubs, updateClubs }) => {
  const [strategy, setStrategy] = useState("including"); // including, containing
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const { isLoading } = useQuery("tags", async () => await db.tags.get(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => setTags(data),
  });

  const hasTag = (club, selected) => {
    const clubTags = club.tags.map((tag) => tag.id);
    const selectedTagIds = selected.map((tag) => tag.id);
    return selectedTagIds.every((tagId) => clubTags.includes(tagId));
  };

  const containsTag = (club, selected) => {
    const clubTags = club.tags.map((tag) => tag.id);
    const selectedTagIds = selected.map((tag) => tag.id);
    return selectedTagIds.some((tagId) => clubTags.includes(tagId));
  };

  const handleIncluding = useCallback(
    (selected) => {
      if (selected.length === 0) {
        return updateClubs(staticClubs);
      }
      const filtered = staticClubs.filter((club) =>
        containsTag(club, selected)
      );
      return updateClubs(filtered);
    },
    [staticClubs, updateClubs]
  );

  const handleContaining = useCallback(
    (selected) => {
      const filtered = staticClubs.filter((club) => hasTag(club, selected));
      updateClubs(filtered);
    },
    [staticClubs, updateClubs]
  );
  const handleSelection = (tag, disabled) => {
    if (disabled) return;
    if (selectedTags.includes(tag)) {
      setSelectedTags((selected) => selected.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags((selected) => [tag, ...selected]);
    }
  };

  useEffect(() => {
    setTags((currentTags) => {
      let filteredTags = currentTags.filter(
        (tag) => !selectedTags.includes(tag)
      );
      filteredTags.unshift(...selectedTags);
      return filteredTags;
    });
  }, [selectedTags]);

  useEffect(() => {
    if (strategy === "including") {
      handleIncluding(selectedTags);
    } else if (strategy === "containing") {
      handleContaining(selectedTags);
    }
  }, [selectedTags, strategy, handleIncluding, handleContaining]);

  const Tag = ({ tag, disabled }) => {
    return (
      <Menu.Item>
        <div
          role="button"
          className="flex flex-row items-center gap-2 cursor-pointer rounded-md px-1 py-1 text-[#344357]"
          onClick={() => handleSelection(tag, disabled)}
        >
          <div
            className="w-full flex flex-row items-center gap-1.5 px-2 py-1.5 rounded-md"
            style={{
              backgroundColor: selectedTags.includes(tag)
                ? tagSchema[tag.name].bg
                : "#F8FAFB",
            }}
          >
            {Icons[tag.name]({
              className: "flex text-sm",
            })}
            <span className="group flex text-xs font-bold uppercase ">
              {tag.name}
            </span>
          </div>
          <span
            style={{
              backgroundColor: selectedTags.includes(tag)
                ? tagSchema[tag.name].bg
                : "#F8FAFB",
            }}
            className="px-2 py-1.5 rounded-md text-xs font-medium"
          >
            {tag._count.clubs}
          </span>
        </div>
      </Menu.Item>
    );
  };

  const MenuItems = () => {
    if (isLoading || !tags)
      return (
        <div className="flex flex-row items-center gap-2 p-1 rounded-md">
          <CgSpinner className="animate-spin" />
          <span className="text-xs font-semibold">Loading tags...</span>
        </div>
      );
    return (
      <div className="p-1">
        <StrategyToggle strategy={strategy} />
        {tags.map((tag, i) => (
          <Tag
            key={i}
            tag={tag}
            disabled={!selectedTags.includes(tag) && selectedTags.length === 4}
          />
        ))}
      </div>
    );
  };

  const StrategyToggle = ({ strategy }) => {
    const isIncluding = strategy === "including";

    const Strat = ({ strategy, active }) => (
      <div
        onClick={() => setStrategy(strategy)}
        className={`w-full flex flex-row items-center justify-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition duration-200 ease-in-out ${
          active ? "bg-cc-light" : "bg-[#F8FAFB]"
        }`}
      >
        <span className="group flex text-xs font-bold capitalize z-10">
          {strategy}
        </span>
      </div>
    );

    return (
      <div className="relative flex flex-row items-center gap-2 p-1 rounded-md w-full">
        <Strat strategy="including" active={isIncluding} />
        <Strat strategy="containing" active={!isIncluding} />
      </div>
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
            <div className="flex flex-row items-center gap-1.5">
              <IoFilter className="text-lg" />
              <span>Filter</span>
            </div>
            <HiChevronDown className="relative top-[0.25px] h-4 w-4" />
          </Menu.Button>
          {selectedTags && selectedTags.length > 0 && (
            <span
              className={`absolute origin-top-right -top-2 -right-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                selectedTags.length === 4
                  ? "text-red-500 bg-red-100"
                  : "text-cc bg-cc-light"
              }`}
            >
              {selectedTags.length}
            </span>
          )}
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
          <Menu.Items className="absolute left-0 mt-2 w-[16rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-56 overflow-y-scroll">
            <MenuItems />
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

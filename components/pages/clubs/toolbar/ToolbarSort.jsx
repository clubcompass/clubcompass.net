import React, { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
export const ToolbarSort = ({
  clubs,
  updateClubs,
  updateGlobalSearchOptions,
}) => {
  const [sortOptions, setSortOptions] = useState({
    label: "Alphabetical (A ➞ Z)",
    category: "alpha",
    order: "desc",
  });

  const handleAlpha = (value) => {
    if (value.order === "asc") {
      const sortedClubs = [...clubs].sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      updateClubs(sortedClubs);
    } else {
      const sortedClubs = [...clubs].sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      updateClubs(sortedClubs);
    }
    return setSortOptions(value);
  };

  const handlePopularity = (value) => {
    if (value.order === "desc") {
      const sortedClubs = [...clubs].sort((a, b) => {
        if (a._count.members < b._count.members) return 1;
        if (a._count.members > b._count.members) return -1;
        return 0;
      });
      updateClubs(sortedClubs);
    } else {
      const sortedClubs = [...clubs].sort((a, b) => {
        if (a._count.members > b._count.members) return 1;
        if (a._count.members < b._count.members) return -1;
        return 0;
      });
      updateClubs(sortedClubs);
    }
    return setSortOptions(value);
  };

  const handleSort = (value) => {
    if (value.category === "alpha") handleAlpha(value);
    if (value.category === "pop") handlePopularity(value);
    // return updateGlobalSearchOptions({
    //   category: value.category,
    //   order: value.order,
    // });
    return;
  };

  useEffect(() => {
    console.log("updated");
  }, [clubs]);

  const MenuItem = ({ value }) => (
    <Menu.Item>
      {({ active }) => (
        <div
          role="button"
          className={`${
            active && "bg-gray-100"
          } flex cursor-pointer rounded-md px-2 py-2`}
          onClick={() => handleSort(value)}
        >
          <span className="group flex w-full items-center text-sm text-[#344357]">
            {value.label}
          </span>
        </div>
      )}
    </Menu.Item>
  );

  const MenuItems = () => {
    const options = [
      [
        {
          label: "Alphabetical (A ➞ Z)",
          category: "alpha",
          order: "desc",
        },
        {
          label: "Alphabetical (Z ➞ A)",
          category: "alpha",
          order: "asc",
        },
        {
          label: "Popularity (most ➞ least)",
          category: "pop",
          order: "desc",
        },
        {
          label: "Popularity (least ➞ most)",
          category: "pop",
          order: "asc",
        },
      ],
    ];
    return (
      <>
        {options.map((items, i) => (
          <div className="px-1 py-1" key={i}>
            {items.map((item, j) => (
              <Fragment key={j}>
                <MenuItem value={item} />
              </Fragment>
            ))}
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
            <span>
              {sortOptions.label ? sortOptions.label : "Sort Applications"}
            </span>
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
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItems />
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

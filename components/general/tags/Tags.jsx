import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Tag } from ".";
export const Tags = ({ tags }) => {
  const [overflow, setOverflow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const e = ref.current;
    setOverflow(
      e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth
    );
  }, [ref.current]);

  return (
    <div className="relative">
      <div ref={ref} className="max-w-[300px] overflow-x-scroll scrollbar-hide">
        <div className="flex flex-row items-center gap-2 whitespace-nowrap">
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

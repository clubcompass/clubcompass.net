import React, { useEffect, useRef, useState } from "react";
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
      <div ref={ref} className="overflow-x-scroll scrollbar-hide">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start items-center gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { Tag } from ".";
export const Tags = ({ tags, clubs }) => {
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
      {clubs ? (
        <div
          ref={ref}
          className="max-w-[300px] overflow-x-scroll scrollbar-hide"
        >
          <div className="flex flex-row items-center gap-2 whitespace-nowrap">
            {tags.map((tag, index) => (
              <Tag key={index} tag={tag.name} />
            ))}
          </div>
        </div>
      ) : (
        <div ref={ref}>
          <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start items-center gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} tag={tag.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

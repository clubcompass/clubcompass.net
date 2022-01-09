import React, { useState } from "react";
import { useQuery } from "react-query";

import { db } from "../../../lib/database";
import { tagSchema } from "../tags";
export const TagSelection = () => {
  const [selected, setSelected] = useState([]);
  console.log(selected);
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery("tags", async () => await db.get.tags());

  const select = ({ tag }) => {
    if (selected.includes(tag.id)) {
      setSelected(selected.filter((id) => id !== tag.id));
    } else {
      setSelected([...selected, tag.id]);
    }
  };

  if (isLoading) return "Loading...";

  return (
    <Container>
      {tags &&
        tags.map((tag) => <Tag key={tag.id} tag={tag} select={select} />)}
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="w-full max-w-[900px]">
    <div className="grid grid-cols-5 gap-2">{children}</div>
  </div>
);

export const Tag = ({ tag, select }) => {
  const [toggled, setToggled] = useState(false);
  const clr = toggled
    ? tagSchema[tag.name] === undefined
      ? "#D0F0FE"
      : tagSchema[tag.name].bg
    : "#F4F4F4";
  return (
    <span
      style={{ backgroundColor: clr }}
      className="flex items-center justify-center py-2 rounded-sm uppercase font-extrabold text-[0.6rem] text-[#344357] cursor-pointer"
      onClick={() => {
        setToggled(!toggled);
        select({ tag });
      }}
    >
      {tag.name}
    </span>
  );
};

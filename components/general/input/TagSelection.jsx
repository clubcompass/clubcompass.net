import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { Loading } from "../Loading";
import { tagSchema } from "../tags";
export const TagSelection = ({ tags, loading, error, limit, set, initial }) => {
  const [field, meta, { setValue }] = useField("tags");
  // console.log(field, meta, helpers);
  const [selected, setSelected] = useState(initial);
  const [limitReached, setLimitReached] = useState(false);

  const select = ({ tag }) => {
    if (selected.includes(tag)) {
      setSelected(
        selected.filter((c) => c.id !== tag.id && c.name !== tag.name)
      );
      setValue(selected.filter((c) => c.id !== tag.id && c.name !== tag.name));
    } else {
      setSelected([...selected, tag]);
      setValue([...selected, tag]);
    }
  };

  useEffect(() => {
    set(selected);
  }, [set, selected]);

  useEffect(() => {
    if (selected.length === limit) {
      setLimitReached(true);
    } else {
      setLimitReached(false);
    }
  }, [limit, selected]);

  if (loading) return <Loading />;
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <Container>
      {tags &&
        tags.map((tag) => (
          <Tag
            key={tag.id}
            tag={tag}
            select={select}
            limitReached={limitReached}
            selected={selected.includes(tag)}
          />
        ))}
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="w-full max-w-[900px]">
    <div className="grid grid-cols-5 gap-2">{children}</div>
  </div>
);

export const Tag = ({ tag, select, limitReached, selected }) => {
  const [toggled, setToggled] = useState(selected);
  const color = {
    fg: toggled ? "#344357" : limitReached ? "#34435730" : "#344357",
    bg: toggled
      ? tagSchema[tag.name] === undefined
        ? "#D0F0FE"
        : tagSchema[tag.name].bg
      : limitReached
      ? "#F4F4F440"
      : "#F4F4F4",
  };
  return (
    <span
      style={{ backgroundColor: color.bg, color: color.fg }}
      className={`${
        toggled
          ? "cursor-pointer"
          : limitReached
          ? "cursor-disabled pointer-events-none"
          : "cursor-pointer"
      } flex items-center justify-center rounded py-2 text-[0.6rem] font-extrabold uppercase`}
      onClick={() => {
        setToggled(!toggled);
        select({ tag });
      }}
    >
      {tag.name}
    </span>
  );
};

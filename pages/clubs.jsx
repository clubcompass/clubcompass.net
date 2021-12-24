import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContainer } from "../components/clubs";
import { Tag } from "../components/tags";
import { db } from "../lib/database";
const Cards = () => {
  const [data, set] = useState([]);
  console.log(data);
  const [tags, setTags] = useState([]);
  const fetchData = async () => {
    // try {
    //   const response = await db.get.clubs.all();
    //   set(response);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const response = await db.get.tags();
      setTags(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    filterByTag({ tag_id: "ckxio7lwh000491q3s34uszro" });
  }, []);

  const filterByTag = async ({ tag_id }) => {
    try {
      const response = await db.get.clubs.by.tag({ tag_id });
      console.log(response);
      set(response);
    } catch (error) {
      console.log(error);
    }
  };

  const mockData = [
    {
      name: "Engineering",
      description:
        "To identify a real-world problem and develop a solution to it. Equips students to become tech entrepreneurs and leaders.",
      primaryTag: "stem",
      tags: ["math", "tech", "stem"],
    },
    {
      name: "Underwater basket weaving",
      description:
        "Learn and understand the ecosystem of underwater basket weaving.",
      primaryTag: "team",
      tags: ["team", "leadership"],
    },
    {
      name: "Algorithmic Programming and Problem Solving Club",
      description:
        "Write complex algorithms and solve real world problems with the power of computer science. And other things too so we can test the truncating",
      primaryTag: "computer science",
      tags: ["computer science", "math", "tech", "stem"],
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => filterByTag({ tag_id: tag.id })}
            className="cursor-pointer"
          >
            <Tag key={tag.id} tag={tag.name} />
          </div>
        ))}
      </div>
      <CardContainer>
        {data && data.map((club, index) => <Card key={index} {...club.club} />)}
        {/* {mockData.map((card, index) => (
          <Card key={index} {...card} />
        ))} */}
      </CardContainer>
    </div>
  );
};

export default Cards;

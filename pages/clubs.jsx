import React, { useState } from "react";
import { useQuery } from "react-query";
import { Card, CardContainer } from "../components/clubs";
import { Tag } from "../components/tags";
import { db } from "../lib/database";
import axios from "axios";
const Cards = () => {
  const [tag_id, setTagId] = useState(null);
  const [currentTag, setCurrentTag] = useState(null);
  const fetchClubs = async ({ tag_id }) => {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/get/club?${
      tag_id !== null
        ? tag_id.length === 1
          ? `tag_id=${tag_id[0]}`
          : `tag_ids=${tag_id.join(",")}`
        : ""
    }`;
    console.log(url);
    const { data: response } = await axios.get(url);

    // response is an array of clubs with each club having an array of tags
    // filter response for clubs with the current tag

    const clubs = response.filter((club) => {
      return club.tags.some((tag) => tag.id === "ckxnyghbr00079vq3yyztnswm");
    });

    console.log(clubs);

    return response;
  };

  const {
    data: clubs,
    error: clubsError,
    isLoading: clubsLoading,
  } = useQuery(["clubs", { tag_id: tag_id }], () => fetchClubs({ tag_id }));

  const {
    data: tags,
    error: tagsError,
    isLoading: tagsLoading,
  } = useQuery("tags", async () => await db.get.tags());

  if (clubsLoading) return "Loading...";
  if (tagsLoading) return "Loading...";

  if (clubsError) return "An error has occurred: " + clubsError.message;
  if (tagsError) return "An error has occurred: " + tagsError.message;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag.id}
            onClick={() => {
              if (tag_id === null) {
                setTagId([tag.id]);
              } else if (tag_id.length !== 0) {
                setTagId([...tag_id, tag.id]);
              }
              if (currentTag === null) {
                setCurrentTag([tag.name]);
              } else if (currentTag.length !== 0) {
                setCurrentTag([...currentTag, tag.name]);
              }
            }}
            className="cursor-pointer"
          >
            <Tag key={tag.id} tag={tag.name} />
          </div>
        ))}
      </div>
      <h1>{currentTag && currentTag.join(",")}</h1>

      <CardContainer>
        {clubs.map((club, index) => (
          <Card key={index} {...club} />
        ))}
      </CardContainer>
    </div>
  );
};

export default Cards;

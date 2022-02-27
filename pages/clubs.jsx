import React, { useState } from "react";
import { useQuery } from "react-query";
import { Tag } from "../components/general/tags";
import { db } from "../lib/database";
import { Clubs } from "../components/pages/clubs";
import { Loading } from "../components/general/Loading";
const Cards = () => {
  const [tag_id, setTagId] = useState(null);
  const [currentTag, setCurrentTag] = useState(null);

  const {
    data: clubs,
    error: clubsError,
    isLoading: clubsLoading,
  } = useQuery("clubs", async () => db.club.get.approved(), {
    refetchOnWindowFocus: false,
  });

  const {
    data: tags,
    error: tagsError,
    isLoading: tagsLoading,
  } = useQuery("tags", async () => await db.tags.get(), {
    refetchOnWindowFocus: false,
  });

  if (clubsLoading) return <Loading />;
  if (tagsLoading) return <Loading />;

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
      <p>{currentTag && currentTag.join(",")}</p>
      {/* <ClubToolbar /> */}
      <Clubs clubs={clubs} />
    </div>
  );
};

export default Cards;

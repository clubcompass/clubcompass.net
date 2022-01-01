import React from "react";
import { db } from "../../../lib/database";
import { useQuery } from "react-query";
import { Card } from "../../clubs";
export const ClubSimilarClubs = ({ tag }) => {
  console.log(tag);
  const { data, isLoading, error } = useQuery(
    "clubs",
    async () => await db.get.clubs.by.tag({ tag_id: tag })
  );

  console.log(data && data);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-2xl">Similar Clubs</h2>
      <div className="grid grid-flow-col gap-6 overflow-x-scroll">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data &&
          data.length > 0 &&
          data.map((club) => (
            <Card
              key={club.id}
              name={club.name}
              description={club.description}
              tags={club.tags}
              slug={club.slug}
            />
          ))
        )}
      </div>
    </div>
  );
};

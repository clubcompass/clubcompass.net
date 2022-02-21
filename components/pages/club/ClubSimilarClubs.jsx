import React from "react";
import { db } from "../../../lib/database";
import { useQuery } from "react-query";
import { Card as Club } from "../../pages/clubs";
export const ClubSimilarClubs = ({ tag }) => {
  console.log(tag);
  const { data, isLoading, error } = useQuery(
    "clubs",
    async () => await db.get.clubs.by.tag({ tag_id: tag })
  );

  console.log(data && data);
  return (
    <div className="flex flex-col gap-1 h-[271px]">
      <h2 className="font-semibold text-2xl">Similar Clubs</h2>
      <div className="grid grid-flow-col gap-6 overflow-x-scroll">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data &&
          data.length > 0 &&
          data.map((club, index) => (
            <Club key={club.slug}>
              <Club.Container>
                <Club.Header
                  name={club.name}
                  primaryTag={club.tags[0].name}
                  tags={club.tags}
                />
                <Club.Content name={club.name} description={club.description} />
                <Club.Footer slug={club.slug} />
              </Club.Container>
            </Club>
          ))
        )}
      </div>
    </div>
  );
};

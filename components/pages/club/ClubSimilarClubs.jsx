import React from "react";
import { db } from "../../../lib/database";
import { useQuery } from "react-query";
import { Card as Club } from "../../pages/clubs";
import { Loading } from "../../general/Loading";

export const ClubSimilarClubs = ({ tag }) => {
  let { data, isLoading, error } = useQuery(
    "clubs",
    async () => await db.clubs.get.by.tags(tag)
  );

  return (
    <div className="flex h-[271px] flex-col gap-1">
      <h2 className="text-2xl font-semibold">Similar Clubs</h2>
      <div className="grid grid-flow-col gap-6 overflow-x-scroll">
        {isLoading ? (
          <Loading />
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

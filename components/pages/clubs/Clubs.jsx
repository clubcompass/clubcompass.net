import React from "react";
import { Card as Club, ClubsWrapper } from ".";
// import { db } from "../../../lib/database"; // get user clubs

export const Clubs = ({ clubs }) => {
  return (
    <ClubsWrapper>
      {clubs.map((club) => (
        <Club key={club.id}>
          <Club.Container>
            <Club.Header
              name={club.name}
              primaryTag={club.tags[0].name}
              tags={club.tags}
            />
            <Club.Content name={club.name} description={club.description} />
            <Club.Footer
              name={club.name}
              slug={club.slug}
              clubId={club.id}
              isMember={club.isMember}
              memberCount={club._count.members}
              availability={club.availability}
            />
          </Club.Container>
        </Club>
      ))}
    </ClubsWrapper>
  );
};

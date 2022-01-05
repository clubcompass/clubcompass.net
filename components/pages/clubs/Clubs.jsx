import React from "react";
import { Card as Club, ClubsWrapper } from ".";
export const Clubs = ({ clubs }) => {
  return (
    <ClubsWrapper>
      {clubs.map((club, index) => (
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
      ))}
    </ClubsWrapper>
  );
};

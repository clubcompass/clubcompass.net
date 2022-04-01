import React from "react";
import { Card as Club, ClubsWrapper } from ".";
// import { db } from "../../../lib/database"; // get user clubs

export const Clubs = ({ clubs, manage, userId, userClubs }) => {
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
            <Club.Footer
              name={club.name}
              slug={club.slug}
              userId={userId}
              clubId={club.id}
              isMember={club?.isMember}
              memberCount={club._count.members}
              manage={manage}
              availability={club.availability}
            />
          </Club.Container>
        </Club>
      ))}
    </ClubsWrapper>
  );
};

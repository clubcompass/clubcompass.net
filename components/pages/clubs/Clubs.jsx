import React from "react";
import ClubsWrapper from "./ClubsWrapper";
import Club from "./Card";
// import { db } from "../../../lib/database"; // get user clubs

const Clubs = ({ clubs }) => {
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

export default Clubs;

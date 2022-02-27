import React from "react";
import { Card as Club, ClubsWrapper } from ".";
import { useAuthContext } from "../../../context/auth";
export const Clubs = ({ clubs }) => {
  const { user } = useAuthContext();

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
              slug={club.slug}
              userId={user.id}
              clubId={club.id}
              members={club.members.map((member) => member.id)}
            />
          </Club.Container>
        </Club>
      ))}
    </ClubsWrapper>
  );
};

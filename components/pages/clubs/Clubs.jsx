import React from "react";
import { Card as Club, ClubsWrapper } from ".";
import { useAuthContext } from "../../../context/auth";
// import { db } from "../../../lib/database"; // get user clubs
export const Clubs = ({ clubs, manage }) => {
  const { user } = useAuthContext();

  const userClubs = user?.clubs.reduce((acc, club) => {
    if (club.approval === "APPROVED") {
      acc.push(club.id);
    }
    return acc;
  }, []);

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
              userId={user?.id}
              clubId={club.id}
              isMember={!user ? false : userClubs.includes(club.id)}
              memberCount={club._count.members}
              manage={manage}
            />
          </Club.Container>
        </Club>
      ))}
    </ClubsWrapper>
  );
};

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context";
import { GET_CLUB } from "../../lib/docs";
import { useQuery } from "@apollo/client";
import { Club as ClubComponent } from "../../components/pages/club";
import { Loading } from "../../components/general/Loading";
import { tagSchema } from "../../components/general/tags";

const Club = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { slug } = router.query;

  const {
    data: { getClub: club = {} } = {},
    loading: clubLoading,
    error: clubError,
  } = useQuery(GET_CLUB, {
    context: {
      ...(user && {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }),
    },
    fetchPolicy: "cache-and-network",
    variables: {
      slug,
    },
  });

  if (clubLoading) return <Loading />;

  if (clubError) return "An error has occurred: " + clubError.message; // toast this mf

  console.log(club);

  return (
    <div className="flex flex-col">
      {club && (
        <ClubComponent>
          <ClubComponent.Wrapper
            availability={club.availability}
            name={club.name}
            isMember={club.isMember}
            userId={user?.id}
            clubId={club.id}
            slug={club.slug}
          >
            <ClubComponent.Header name={club.name} tags={club.tags} />
            <ClubComponent.Contact email={club.email} links={club.links} />
            <ClubComponent.Meeting
              time={club.meetingDate}
              location={club.location}
              availability={club.availability}
            />
            <ClubComponent.Content description={club.description} />
            <ClubComponent.Members
              members={club.members}
              primaryColor={tagSchema[club.tags[0].name]}
            />
            <ClubComponent.SimilarClubs tag={club.tags[0].id} />
          </ClubComponent.Wrapper>
        </ClubComponent>
      )}
    </div>
  );
};
export default Club;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../context";
import { GET_CLUB } from "../../lib/docs";
import { useQuery } from "@apollo/client";
import { Club as ClubComponent } from "../../components/pages/club";
import { Loading } from "../../components/general/Loading";

const Club = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [slugLoaded, setSlugLoaded] = useState(false);
  const { slug } = router.query;

  const {
    data: { getClub: club = {} } = {},
    loading: clubLoading,
    error: clubError,
  } = useQuery(GET_CLUB, {
    variables: {
      slug,
    },
  });

  if (!club || clubLoading) return <p>loading...</p>;

  // const userClubs = user?.clubs.reduce((acc, club) => {
  //   if (club.approval === "APPROVED") {
  //     acc.push(club.id);
  //   }
  //   return acc;
  // }, []);

  console.log("name", slugLoaded);
  console.log("clubs", clubLoading);

  if (!user || loading) return <Loading />;

  if (clubLoading) return <Loading />;

  if (clubError) return "An error has occurred: " + clubError.message;

  console.log(club);

  return (
    <div className="flex flex-col">
      {club && (
        <ClubComponent>
          <ClubComponent.Wrapper
            availability={club.availability}
            name={club.name}
            isMember={false}
            // isMember={!user ? false : userClubs.includes(club.id)}
            userId={user && user?.id}
            clubId={club.id}
            slug={club.slug}>
            <ClubComponent.Header name={club.name} tags={club.tags} />
            <ClubComponent.Contact email={club.email} links={club.links} />
            <ClubComponent.Meeting
              time={club.meetingDate}
              location={club.location}
              availability={club.availability}
            />
            <ClubComponent.Content description={club.description} />
            <ClubComponent.Members members={club.members} />
            <ClubComponent.SimilarClubs tag={club.tags[0].id} />
          </ClubComponent.Wrapper>
        </ClubComponent>
      )}
    </div>
  );
};
export default Club;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { db } from "../../lib/database";
import { Club as ClubComponent } from "../../components/pages/club";
import { Loading } from "../../components/general/Loading";

// import { MdLocationOn } from "react-icons/md";
// import { BsClock, BsFillPersonFill } from "react-icons/bs";
// import { IoMdMail } from "react-icons/io";
// import { BsClockFill } from "react-icons/bs";
// import { FiExternalLink } from "react-icons/fi";

const Club = () => {
  const router = useRouter();
  const [slugLoaded, setSlugLoaded] = useState(false);
  const { slug } = router.query;

  const {
    data: club,
    error: clubError,
    isLoading: clubLoading,
  } = useQuery("club", async () => await db.clubs.get.by.slug(slug), {
    enabled: slugLoaded,
  });

  console.log("name", slugLoaded);
  console.log("clubs", clubLoading);

  useEffect(() => {
    slug === undefined ? setSlugLoaded(false) : setSlugLoaded(true);
  }, [slug]);

  if (clubLoading === true) return <Loading />;

  if (clubError) return "An error has occurred: " + clubError.message;

  console.log(club);

  return (
    <div className="flex flex-col">
      {club && (
        <ClubComponent>
          <ClubComponent.Wrapper availability={club.availability}>
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

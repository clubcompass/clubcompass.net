import { useEffect, useState } from "react";
import { GET_APPROVED_CLUBS } from "../lib/docs/clubDocuments";
import { useQuery } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthContext, useToastContext } from "../context";
import { Clubs, ClubsToolbar } from "../components/pages/clubs";
import { Loading } from "../components/general/Loading";
const Cards = () => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const [clubs, setClubs] = useState([]);
  const [staticClubs, setStaticClubs] = useState([]); // static clubs could be abstracted to just be data returned from query
  const { loading: clubsLoading } = useQuery(GET_APPROVED_CLUBS, {
    context: {
      ...(user && {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }),
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ getApprovedClubs: clubs = {} } = {}) => {
      console.log(clubs);
      setClubs(clubs);
      setStaticClubs(clubs);
    },
    onError: (e) => {
      addToast({
        type: "error",
        title: "Error",
        description:
          "There was an error loading the clubs, please try again later.",
      });
      console.log(e);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {clubsLoading ? (
        <SkeletonTree />
      ) : (
        <>
          <ClubsToolbar
            clubs={clubs}
            staticClubs={staticClubs}
            updateClubs={setClubs}
          />
          {clubs.length !== 0 ? (
            <Clubs clubs={clubs} userClubs={[]} />
          ) : (
            <div>No clubs found.</div>
          )}
        </>
      )}
    </div>
  );
};

const SkeletonTree = () => {
  const cards = 12;
  return (
    <div className="grid grid-cols-cards gap-6">
      {Array.from({ length: cards }).map((_, i) => (
        <Skeleton
          key={i}
          height={223}
          width="100%"
          borderRadius={12}
          baseColor="#fafafa"
          highlightColor="#eeeeee"
        />
      ))}
    </div>
  );
};

export default Cards;

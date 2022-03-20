import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../context";
import { db } from "../lib/database";
import { GET_CLUBS } from "../lib/docs";
import { Clubs, ClubsToolbar } from "../components/pages/clubs";
import { Loading } from "../components/general/Loading";
const Cards = () => {
  const { user } = useAuthContext();
  const [clubs, setClubs] = useState([]);
  const { error: clubsError, isLoading: clubsLoading } = useQuery(GET_CLUBS, {
    onCompleted: ({ getClubs: clubs }) => {
      // const sortedClubs = clubs.sort((a, b) => {
      //   if (a.name > b.name) return 1;
      //   if (a.name < b.name) return -1;
      //   return 0;
      // });
      setClubs(clubs);
    },
  });

  if (clubsLoading) return <Loading />;

  if (clubsError) return "An error has occurred: " + clubsError.message;

  // console.log("clubs", clubs);

  return (
    <div className="flex flex-col gap-6">
      <ClubsToolbar clubs={clubs} updateClubs={setClubs} />
      {clubs.length !== 0 ? (
        <Clubs clubs={clubs} userClubs={user && user.userClubs} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Cards;

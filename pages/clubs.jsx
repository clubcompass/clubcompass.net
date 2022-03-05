import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { db } from "../lib/database";
import { Clubs, ClubsToolbar } from "../components/pages/clubs";
import { Loading } from "../components/general/Loading";
const Cards = () => {
  const [clubs, setClubs] = useState([]);
  const {
    data: staticClubs,
    error: clubsError,
    isLoading: clubsLoading,
  } = useQuery("clubs", async () => await db.clubs.get.approved(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const sortedClubs = data.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      setClubs(sortedClubs);
    },
  });

  if (clubsLoading) return <Loading />;

  if (clubsError) return "An error has occurred: " + clubsError.message;

  return (
    <div className="flex flex-col gap-6">
      <ClubsToolbar
        clubs={clubs}
        staticClubs={staticClubs}
        updateClubs={setClubs}
      />
      {clubs.length !== 0 ? <Clubs clubs={clubs} /> : "No clubs found."}
    </div>
  );
};

export default Cards;

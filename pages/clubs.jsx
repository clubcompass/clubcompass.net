import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { db } from "../lib/database";
import { Clubs, ClubsToolbar } from "../components/pages/clubs";
import { Loading } from "../components/general/Loading";
const Cards = () => {
  const [clubs, setClubs] = useState([]);
  const { error: clubsError, isLoading: clubsLoading } = useQuery(
    "clubs",
    async () => await db.clubs.get.approved(),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const sortedClubs = data.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        setClubs(sortedClubs);
      },
    }
  );

  if (clubsLoading) return <Loading />;

  if (clubsError) return "An error has occurred: " + clubsError.message;

  console.log("clubs", clubs);

  return (
    <div className="flex flex-col gap-6">
      <ClubsToolbar clubs={clubs} updateClubs={setClubs} />
      {clubs.length !== 0 ? <Clubs clubs={clubs} /> : <Loading />}
    </div>
  );
};

export default Cards;

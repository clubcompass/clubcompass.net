import React from "react";
import { useAuthContext } from "../../../../../context";
import { useQuery } from "react-query";
import { db } from "../../../../../lib/database";
import { ClubForm } from "../components/ClubForm";
import { Loading } from "../../../../general/Loading";
export const DashboardEditClub = ({ slug }) => {
  const { user } = useAuthContext();

  const {
    data: club,
    isLoading,
    error: clubError,
  } = useQuery("club", async () => await db.clubs.get.by.slug(slug), {
    refetchOnWindowFocus: false,
  });

  console.log(club && club);

  if (clubError) {
    return <div>Error</div>;
  }

  if (isLoading) return <Loading />;

  const initialValues = {
    name: club.name,
    description: club.description,
    meetingDate: club.meetingDate,
    location: club.location,
    vicePresident: "",
    secretary: "",
    treasurer: "",
    memberIds: [],
    tagIds: [],
    teacher: "",
  };

  // const initialValues = {}

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <ClubForm id={user.id} initialValues={initialValues} />
      </div>
    </div>
  );
};

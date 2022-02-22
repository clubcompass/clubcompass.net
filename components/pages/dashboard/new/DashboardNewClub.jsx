import React from "react";
import { useAuthContext } from "../../../../context";
import { NewClubForm } from "./components";
export const DashboardNewClub = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <NewClubForm id={user.id} />
      </div>
    </div>
  );
};

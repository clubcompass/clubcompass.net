import React from "react";
import { useAuthContext } from "../../../../context";
import { db } from "../../../../lib/database";
import { Loading } from "../../../general/Loading";
import { DashboardHeader } from "./DashboardHeader";
import { Clubs } from "../../clubs/Clubs";

export const DashboardUserClubs = () => {
  const { user } = useAuthContext();

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader name={user.firstname} ccid={user.ccid} />
      <Clubs clubs={user.clubs} />
    </div>
  );
};

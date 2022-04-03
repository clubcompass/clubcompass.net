import React from "react";
import { useAuthContext } from "../../../../context";
import { Loading } from "../../../general/Loading";
import { CustomTitle } from "../../../general/CustomTitle";
import {
  DashboardUserWrapper as CardsWrapper,
  DashboardUserCard,
} from "./components";

export const DashboardUserClubs = ({ clubs }) => {
  if (!clubs && loadingClubs) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      <>
        <CustomTitle
          title="Your Clubs"
          subtitle="All the clubs you are currently a part of."
        />
        <CardsWrapper>
          {clubs.map((club, i) => (
            <DashboardUserCard key={i} club={club} />
          ))}
        </CardsWrapper>
      </>
    </div>
  );
};
